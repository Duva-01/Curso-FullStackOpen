import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommended = (props) => {
  const { loading: loadingBooks, error: errorBooks, data: dataBooks } = useQuery(ALL_BOOKS);
  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(ME);

  if (!props.show) {
    return null;
  }

  if (loadingBooks || loadingMe) return <p>Loading...</p>;
  if (errorBooks || errorMe) return <p>Error :(</p>;

  const favoriteGenre = dataMe?.me?.favoriteGenre;
  const recommendedBooks = favoriteGenre
    ? dataBooks.allBooks.filter((book) => book.genres && book.genres.includes(favoriteGenre))
    : [];

  return (
    <div>
      <h2>Recommended books</h2>
      {favoriteGenre ? (
        <>
          <p>Books in your favorite genre '{favoriteGenre}':</p>
          <table>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
              {recommendedBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No favorite genre specified</p>
      )}
    </div>
  );
};

export default Recommended;
