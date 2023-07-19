import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';

import anecdoteService from './services/anecdotes';
import {initializeAnecdotes} from './reducers/anecdoteReducer';



const App = () => {

  const notification = useSelector(state => state.notification);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch])
  
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <div>{notification}</div>}
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
}

export default App