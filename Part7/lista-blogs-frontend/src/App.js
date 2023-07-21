import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import blogService from './services/blogs';
import loginService from './services/loginService';

import BlogForm from './components/blogForm';
import Togglable from './components/Togglable';
import Blog from './components/blog';
import LoginForm from './components/login';

import './App.css';

import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from './reducers/blogsReducer';
import { setUser, clearUser } from './reducers/userReducer';

import { Link, Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom';

import BlogView from './components/blogView';
import User from './components/User';
import UserList from './components/UserList';
import userService from './services/userService';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';

const App = (props) => {

  const [users, setUsers] = useState([]);
  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      props.setUser(user);
      props.setNotification(`Welcome ${user.name}`, 'success', 5);
    } catch (exception) {
      props.setNotification('Wrong username or password', 'error', 5);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken(null);
    props.clearUser();
  };

  const handleLikeBlog = async (blog) => {
    console.log(blog._id)
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    try {
      const returnedBlog = await blogService.update(blog._id, updatedBlog);
      
      const updatedBlogs = await blogService.getAll();
      props.initializeBlogs(updatedBlogs);
      
      props.setNotification(`Blog ${returnedBlog.title} liked`, 'success', 5);
    } catch (exception) {
      props.setNotification(`Error liking blog ${blog.title}`, 'error', 5);
    }
};



useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    props.setUser(user);
    blogService.setToken(user.token);
  }

  blogService.getAll().then((blogs) => props.initializeBlogs(blogs));

  userService.getAll().then((users) => setUsers(users));

}, []);

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      props.createBlog(returnedBlog);
      props.setNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success', 5);
    } catch (exception) {
      props.setNotification(`Blog ${blogObject.title} was not added`, 'error', 5);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      props.deleteBlog(id);
      props.setNotification(`Blog removed`, 'success', 5);
    } catch (exception) {
      props.setNotification(`Error removing blog`, 'error', 5);
    }
  };

  if (props.user === null) {
    return (
      <div className="container">
        <h2>Bloglist</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <Router>
      <Container>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#">Bloglist</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Link className="nav-link" to="/">Blogs</Link>
                  <Link className="nav-link" to="/users">Users</Link>
                </Nav>
                <Navbar.Text>
                  {props.user.name} logged in <Button variant="outline-danger" onClick={handleLogout}>logout</Button>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>

            <Togglable buttonLabel="New blog" ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
      
      <Routes>
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/blogs/:id" element={<BlogView blogs={props.blogs} addComment={blogService.addComment} getAllBlogs={blogService.getAll} initializeBlogs={props.initializeBlogs} />} />

        <Route path="/" element={
          <>
            {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog._id} blog={blog} onLike={handleLikeBlog} onDelete={deleteBlog} own={props.user.username === blog.user.username} />
            )}
          </>
        } />
      </Routes>
      </Container>
    </Router>
);
};


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user,
  };
};

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  setUser,
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
