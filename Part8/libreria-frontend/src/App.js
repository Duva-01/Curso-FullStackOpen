import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended';
import LoginForm from './components/LoginForm';

import { useQuery } from '@apollo/client';
import { ME } from './queries';

const App = () => {

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('user-token'));
  const { loading, error, data } = useQuery(ME);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('user-token');
  };

  const isLoggedIn = token || localStorage.getItem('user-token');

  if (isLoggedIn) {

    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>Recommended books</button>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <Authors show={page === 'authors'} />

        <Books show={page === 'books'} />

        <NewBook show={page === 'add'} />
        <Recommended show={page === 'recommended'} />
      </div>
    )
  }else {
    return (
      <div>
        <LoginForm setToken={setToken} />
      </div>
    );
  }
}

export default App
