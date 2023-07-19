import axios from 'axios';

const config = { baseURL: 'http://localhost:3001/anecdotes' };

const create = (content) => 
  axios.post('', { content, votes: 0 }, config)
  .then(response => {
    return response.data;
  });

const getAll = () => axios.get('', config).then(response => response.data);

const setVotes = (id, votes) => axios.patch(id, { votes }, config);

const anecdoteService = { create, getAll, setVotes };

export default anecdoteService;