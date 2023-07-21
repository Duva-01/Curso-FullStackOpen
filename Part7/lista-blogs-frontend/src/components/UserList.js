import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import { ListGroup } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then(users => setUsers(users));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ListGroup>
        {users && users.map(user => 
          <ListGroup.Item key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>, blogs created: {user.blogs.length}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default UserList;
