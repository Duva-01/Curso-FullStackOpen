import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, onLike, onDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {

    onLike(blog);
  };

  const handleDelete = () => {
    if (window.confirm(`Do you really want to delete blog ${blog.title} by ${blog.author}?`)) {
      onDelete(blog._id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  

  return (
    <div style={blogStyle} className='blog'>
      <div className="blogTitleAuthor">
        {blog.title} {blog.author}
        <button id="toggleVisibilityButton" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div className="blogDetails">
          <div>{blog.url}</div>
          <div>
            Likes: <span id="likesCount">{blog.likes !== null ? blog.likes : 0}</span>
            <button id="likeButton" onClick={handleLike}>like</button>
          </div>
          
          <div>{blog.user.name}</div>
          {user && user.username === blog.user.username && (
            <button id="deleteButton" onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};


Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blog;
