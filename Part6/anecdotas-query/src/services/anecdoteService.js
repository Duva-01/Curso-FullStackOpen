import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const vote = async (id) => {
    const anecdoteToVote = await axios.get(`${baseUrl}/${id}`);
    const updatedAnecdote = {
      ...anecdoteToVote.data,
      votes: anecdoteToVote.data.votes + 1,
    };
    const response = await axios.patch(`${baseUrl}/${id}`, updatedAnecdote);
    return response.data;
  };

const anecdoteService = {
  getAll,
  create,
  vote,
};

export default anecdoteService;
