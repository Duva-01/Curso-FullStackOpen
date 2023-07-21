import React from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const User = ({ users }) => {
  const { id } = useParams();
  const user = users.find(u => u.id === id);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ListGroup>
        {user.blogs.map(blog =>
          <ListGroup.Item key={blog.id}>
            {blog.title}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default User;
