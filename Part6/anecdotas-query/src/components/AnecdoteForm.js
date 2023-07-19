import { useMutation, useQueryClient } from 'react-query';
import { useNotification } from '../NotificationContext';
import axios from 'axios';
import anecdoteService from '../services/anecdoteService';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotification();

  const addAnecdote = async (content) => {
    const response = await anecdoteService.create(content);
    return response.data;
  };

  const mutation = useMutation(addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
    onError: (error) => {
      setNotification(`An error occurred: ${error.message}`);
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    if (content.length >= 5) {
      try {
        await mutation.mutateAsync(content);
        setNotification(`New anecdote "${content}" created!`);
      } catch (error) {
        setNotification(`An error occurred: ${error.message}`);
      }
    } else {
      setNotification('Anecdote content must be at least 5 characters long.');
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
