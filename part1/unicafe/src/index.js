import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0)

  const handleClick = (state, feedback) => {
    state(feedback + 1);
    setAll(all + 1);
  };
  
  return (
    <div>
      <Title text={'give feedback'} />
      <Button handleClick={() => handleClick(setGood, good)} text={'good'} />
      <Button handleClick={() => handleClick(setNeutral, neutral)} text={'neutral'}/>
      <Button handleClick={() => handleClick(setBad, bad)} text={'bad'} />
      <Title text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

// Components
const Title = ({ text }) => {
  return <><h1>{text}</h1></>
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({good, neutral, bad, all}) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good - bad) / all}</p>
      <p>positive {(good / all) * 100} %</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
