import { useState } from 'react'
import { useMutation } from '@apollo/client';
import Select from 'react-select';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const EditAuthor = (props) => {

  const [born, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: selectedAuthor.value, setBornTo: parseInt(born) } });

    setBorn('')
    setSelectedAuthor(null)
  }

  const options = props.authors.map(author => {
    return {value: author.name, label: author.name}
  })

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select 
            defaultValue={selectedAuthor}
            onChange={setSelectedAuthor}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
