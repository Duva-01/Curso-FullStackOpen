import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showTimedNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ createAnecdote, showTimedNotification }) => {
  const [content, setContent] = useState('');
  
  const addNewAnecdote = (event) => {
    event.preventDefault();
    createAnecdote(content);
    showTimedNotification(`created anecdote "${content}"`, 5);
    setContent('');
  };
  
  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  showTimedNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);
