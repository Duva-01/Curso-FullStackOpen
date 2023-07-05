import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {

  // Variables

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));


  // Controladores

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  //------------------------------------------------//

  const getMaxVotesIndex = () => {
    let maxIndex = 0;
    let maxVotes = votes[0];

    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > maxVotes) {
        maxIndex = i;
        maxVotes = votes[i];
      }
    }

    return maxIndex;
  };

  const maxVotesIndex = getMaxVotesIndex();

  //------------------------------------------------//

  return (

    <div>

      <h1>Anecdote of the Day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has recibido {votes[selected]} votos</p>

      <button onClick={handleVote}>Vote</button>
      <button onClick={handleClick}>Next Anecdote</button>

      <h2>Anecdote with the Most Votes</h2>
      <p>{props.anecdotes[maxVotesIndex]}</p>
      <p>Has recibido {votes[maxVotesIndex]} votos</p>

    </div>

  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);
