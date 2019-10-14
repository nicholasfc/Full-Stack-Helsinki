import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = props => (
  <div>
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  let total = good + bad + neutral;

  let average = (good + bad * -1) / total;

  let positives = (good / total) * 100;

  if ((good || neutral || bad) !== 0) {
    return (
      <div>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="average" value={average} />
        <Statistic text="positives" value={positives} />
      </div>
    );
  }
  return <div>No feedback given :(</div>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = () => {
    setGood(good + 1);
  };
  const setToNeutral = () => {
    setNeutral(neutral + 1);
  };
  const setToBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h3>give feedback</h3>
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
