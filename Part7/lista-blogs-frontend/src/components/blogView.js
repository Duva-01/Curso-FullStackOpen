import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


const BlogView = ({ blogs, addComment, getAllBlogs, initializeBlogs }) => {
  const { id } = useParams();
  const blog = blogs.find(blog => blog._id === id);

  const [comment, setComment] = useState('');

  if (!blog) {
    return null;
  }

  const handleAddComment = async (event) => {
    event.preventDefault();
    try {
      await addComment(id, comment);
      const updatedBlogs = await getAllBlogs();
      initializeBlogs(updatedBlogs);
      setComment('');
    } catch (exception) {
      console.error('Error adding comment:', exception);
    }
  };
  
  

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button>like</button></p>
      <p>added by {blog.user.name}</p>

      <h2>Comments: </h2>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input 
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default BlogView;
