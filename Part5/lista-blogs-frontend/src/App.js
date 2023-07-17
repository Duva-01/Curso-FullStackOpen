import { useState, useEffect, useRef } from 'react';

import blogService from './services/blogs';
import loginService from './services/loginService';

import BlogForm from './components/blogForm';
import Togglable from './components/Togglable';
import Blog from './components/blog';
import LoginForm from './components/login';

import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();
  const [loggedInUser, setLoggedInUser] = useState(null); // Nuevo estado para almacenar el usuario logueado

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginUser = await loginService.login({ username, password });
      blogService.setToken(loginUser.token);

      window.localStorage.setItem('loggedUser', JSON.stringify(loginUser));

      setUser(loginUser);
      setUsername('');
      setPassword('');
      showNotification('Correct login', 'success', 5);
    } catch (error) {
      showNotification('Wrong username or password', 'error', 5);
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('loggedUser');
  };

  const handleLikeBlog = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    try {
      const returnedBlog = await blogService.update(blog._id, updatedBlog);
      setBlogs(blogs.map((b) => (b._id === blog._id ? returnedBlog : b)));
      showNotification(`Blog ${returnedBlog.title} liked`, 'success', 5);
    } catch (exception) {
      showNotification(`Error liking blog ${blog.title}`, 'error', 5);
    }
  };

  const showNotification = (message, type, time) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, time * 1000);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedInUser(user); // Actualizar el usuario logueado
      setUser(user);
      blogService.setToken(user.token);
    }

    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      showNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success', 5);

      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      showNotification(`Blog ${blogObject.title} was not added`, 'error', 5);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      showNotification(`Blog removed`, 'success', 5);
    } catch (exception) {
      showNotification(`Error removing blog`, 'error', 5);
    }
  };

  if (user === null) {
    return (
      <div className="container">
        <header className="header">
          <h2>Welcome to Bloglist App</h2>
          <LoginForm
            className="login-form"
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </header>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h2>List of blogs</h2>
        {notification && (
          <p
            className={`notification ${
              notification.type === 'error' ? 'notification-error' : 'notification-success'
            }`}
          >
            {notification.message}
          </p>
        )}
        <p>
          <b>{user.name}</b> is logged in
        </p>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <section className="create-blog-section">
          <BlogForm className="blog-form" createBlog={createBlog} />
        </section>
      </Togglable>

      <section className="blog-list-section">
        <h3>Blog List</h3>
        <table className="blog-list-table">
          <thead>
            <tr>
              <th>Titulo</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(blogs) &&
              blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <Blog
                      className="blog"
                      blog={blog}
                      onLike={() => handleLikeBlog(blog)}
                      onDelete={deleteBlog}
                      user={loggedInUser}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default App;
