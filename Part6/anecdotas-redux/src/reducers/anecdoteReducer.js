import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, { payload: anecdote }) {
      state.push(anecdote);
    },
    setAnecdotes(_state, { payload }) {
      return payload;
    },
  },
});

export const initializeAnecdotes = () => async (dispatch) =>
  dispatch(setAnecdotes(await anecdoteService.getAll()));

export const createAnecdote = (content) => async (dispatch) =>
  dispatch(appendAnecdote(await anecdoteService.create(content)));

  export const voteAnecdote = (id) => async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find((anecdote) => anecdote.id === id)
    
    if (anecdoteToVote) {
      const { votes } = anecdoteToVote;
      const response = await anecdoteService.setVotes(id, votes + 1);
    
      if (response.data) {
        dispatch(
          setAnecdotes(getState().anecdotes.map((anecdote) => anecdote.id !== id ? anecdote : response.data))
        );
      }
    }
  };
  

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;