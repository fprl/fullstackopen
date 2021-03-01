import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (state, feedback) => {
    state(feedback + 1);  
  }
  
  return (
    <div>
      <Title text={'give feedback'} />
      <Button handleClick={() => handleClick(setGood, good)} text={'good'} />
      <Button handleClick={() => handleClick(setNeutral, neutral)} text={'neutral'} />
      <Button handleClick={() => handleClick(setBad, bad)} text={'bad'} />
      <Title text={'statistics'} />
      <Total text={'good'} feedback={good} />
      <Total text={'neutral'} feedback={neutral} />
      <Total text={'bad'} feedback={bad} />
    </div>
  )
};

// Components
const Title = ({text}) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Total = ({text, feedback}) => {
  return(
    <p>{text} {feedback}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
