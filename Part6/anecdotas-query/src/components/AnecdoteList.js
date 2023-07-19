import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNotification } from '../NotificationContext';
import anecdoteService from '../services/anecdoteService';

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotification();
  const { data: anecdotes, isLoading, isError } = useQuery('anecdotes', anecdoteService.getAll);

  const voteMutation = useMutation(anecdoteService.vote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote.id);
    setNotification(`Voted for "${anecdote.content}"!`);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading anecdotes...</p>
      ) : isError ? (
        <p>Error retrieving anecdotes</p>
      ) : (
        <>
          {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AnecdoteList;
