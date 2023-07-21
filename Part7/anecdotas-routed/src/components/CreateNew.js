import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const CreateNew = (props) => {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [info, setInfo] = useState('');
    const navigate = useNavigate()
    
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const newAnecdote = {
        content,
        author,
        info,
        votes: 0
      };
    
      props.addNew(newAnecdote);

      navigate('/');  
    };
    

    return (
      <div>
        <h2>Create New Anecdote</h2>
        
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={info}
              onChange={(event) => setInfo(event.target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    );
};

export default CreateNew;
