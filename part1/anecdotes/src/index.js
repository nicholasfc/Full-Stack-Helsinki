import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const randomNumber = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Display = props => (
  <div>
    {props.value}
    {props.text}
  </div>
);

const Votes = ({ votes }) => <Display text="votes" value={votes} />;

const App = props => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  const nextJoke = () => {
    setSelected(randomNumber(anecdotes.length));
  };

  /*const countVote = () => {
    setVote(vote + 1);
  };*/
  const voteJoke = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
  };

  const biggestVote = Math.max(...vote);
  const bestJoke = props.anecdotes[vote.indexOf(biggestVote)];

  return (
    <div>
      <h3>Anecdote of the day</h3>
      {props.anecdotes[selected]}
      <Votes votes={vote[selected]} text="votes" />
      <Button handleClick={voteJoke} text="vote" />
      <Button handleClick={nextJoke} text="next joke" />

      <h3>Anecdote with most votes</h3>
      {bestJoke}
      <Votes votes={biggestVote} text="votes" />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
