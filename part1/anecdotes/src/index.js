import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(props.votes)

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  }
  
  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy)
  }

  console.log(votes)
  return (
    <div>
      <h3>{props.anecdotes[selected]}</h3>
      <h3>has {votes[selected]} votes</h3>
      <Button handleClick={() => handleClick()} text={"next anecdote"} />
      <Button handleClick={() => handleVote()} text={"vote"} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const votes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);

ReactDOM.render(<App anecdotes={anecdotes} votes={votes} />, document.getElementById('root'));
