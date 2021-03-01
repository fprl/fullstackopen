import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(props.votes);
  console.log(selected)
  console.log(votes)
  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdotes={props.anecdotes} selected={selected} />
        <Votes votes={votes} selected={selected} />
        <Button handleClick={() => handleClick()} text={'next anecdote'} />
        <Button handleClick={() => handleVote()} text={'vote'} />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdotes={props.anecdotes} votes={votes} />
        <Votes votes={votes} />
      </div>
    </div>
  );
};

const Anecdote = (props) => {
  if (!props.votes) {
    // anecdote of the day
    return <p>{props.anecdotes[props.selected]}</p>;
  }
  // anecdote with most votes
  const {votes} = props;
  return (
    <p>{props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
  );
};

const Votes = (props) => {
  // anecdote of the day votes
  if (props.selected) {
    return <p>has {props.votes[props.selected]} votes</p>;
  }
  // votes for the anecdote with most votes
  const { votes } = props;
  return <p>has {votes[votes.indexOf(Math.max(...votes))]} votes</p>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const votes = Array.apply(null, new Array(anecdotes.length)).map(
  Number.prototype.valueOf,
  0
);

ReactDOM.render(
  <App anecdotes={anecdotes} votes={votes} />,
  document.getElementById('root')
);
