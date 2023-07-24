import { useState } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from '../queries'


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      if (error.graphQLErrors[0] && error.graphQLErrors[0].message) {
        console.log(error.graphQLErrors[0].message);
      } else {
        console.log(error);
      }
    },
    onCompleted: () => {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    },
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const { data } = useSubscription(BOOK_ADDED);

  if (data) {
    const addedBook = data.bookAdded;
    alert(`New book added: ${addedBook.title} by ${addedBook.author.name}`);
  }

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, published: parseInt(published), genres } })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
 <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            />
          </div>
          <div>
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <button onClick={addGenre} type="button">
              add genre
            </button>
          </div>
          <div>genres: {genres.join(' ')}</div>
          <button type="submit">create book</button>
        </form>
      </div>
    )
  }
  
  export default NewBook
  
