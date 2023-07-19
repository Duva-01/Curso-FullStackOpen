import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showTimedNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ anecdotes, voteAnecdote, showTimedNotification }) => {
  const vote = (anecdote) => {
    voteAnecdote(anecdote.id);
    showTimedNotification(
      `voted anecdote "${anecdotes.find((aux) => aux.id === anecdote.id).content}"`
    );
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const filter = state.filter;
  const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
    anecdote && anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
  return {
    anecdotes: filteredAnecdotes.sort((a, b) => b.votes - a.votes),
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  showTimedNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
