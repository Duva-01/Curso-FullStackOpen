import { useField } from '../hooks/Hooks';

const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (event) => {
    event.preventDefault();

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });

    // reset fields
    content.reset();
    author.reset();
    info.reset();
  }

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input {...content} reset={undefined} />
        </div>
        <div>
          <input {...author} reset={undefined} />
        </div>
        <div>
          <input {...info} reset={undefined} />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={() => { content.reset(); author.reset(); info.reset(); }}>Reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
