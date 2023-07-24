import React, { useState } from 'react';
import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from '../queries';

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('all');
  const result = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.title).includes(object.title);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`New book added: ${addedBook.title} by ${addedBook.author.name}`);
      updateCacheWith(addedBook);
    },
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  const genres = result.data.allBooks.reduce((acc, book) => {
    if (book.genres) {
      book.genres.forEach((genre) => {
        if (!acc.includes(genre)) {
          acc.push(genre);
        }
      });
    }
    return acc;
  }, []);

  const filteredBooks = genreFilter === 'all'
    ? result.data.allBooks
    : result.data.allBooks.filter((book) => book.genres && book.genres.includes(genreFilter));

  return (
    <div>
      <h2>Books</h2>
      <div>
        <span>Filter by genre:</span>
        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          <option value="all">All genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
