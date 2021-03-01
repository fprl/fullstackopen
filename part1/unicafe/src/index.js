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
const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  const {good, neutral, bad, all} = props;

  return (
    <div>
      <Statistic text={"good"} value={good} />
      <Statistic text={"neutral"} value={neutral} />
      <Statistic text={"bad"} value={bad} />
      <Statistic text={"all"} value={all} />
      <Statistic text={"average"} value={(good - bad) / all} />
      <Statistic text={"positive"} value={(good / all) * 100} />
    </div>
  );
};

const Statistic = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
