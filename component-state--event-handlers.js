//https://fullstackopen.com/en/part1/component_state_event_handlers

//Component State, Event handlers

//Start Code
const Hello = props => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
};

//Component Helper function
//Expanding our Hello component

const Hello = props => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>{" "}
    </div>
  );
};

//in JavaScript, defining functions within functions is a commonly used technique

//destructuring
//since props is an object
props = {
  name: "Arto hellas",
  age: 35
};

//we can streamline our component by assigning the values of the properties directly into two variables name and age which we can then use in our code
const Hello = props => {
  const name = props.name;
  const age = props.age;
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

//Destructuring makes the assignment of variables even easier, since we can use it to extract and gather the values of an object's properties into separate variables

const Hello = props => {
  const { name, age } = props; //we use destructuring here
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

//or we can take a step further with
const Hello = ({ name, age }) => {
  //the destructuring is happening here inside the ()
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

//page re-rendering

//Start code
const App = props => {
  const { counter } = props;
  return <div>{counter}</div>;
};
let counter = 1;
ReactDOM.render(<App counter={counter} />, document.getElementById("root"));
counter += 1;

//the component wont re-render because we need to call the reactDOM.render again
const App = props => {
  const { counter } = props;
  return <div>{counter}</div>;
};

let counter = 1;

const refresh = () => {
  ReactDOM.render(<App counter={counter} />, document.getElementById("root"));
};

refresh();
counter += 1;
refresh();
counter += 1;
refresh();

//calling the reactdom.render method multiple times is not recommended

//Stateful Component

//All of our components up till now have been simple in the sense that they have not contained any state that could change during the lifecycle of the component
//Next, let's add state to our application's App component with the help of React's STATE HOOK

import React, { useState } from "react"; //imports the useState function
import ReactDOM from "react-dom";

const App = props => {
  const [counter, setCounter] = useState(0); //The function body that defines the component begins with the function call
  setTimeout(() => setCounter(counter + 1), 1000);

  console.log("rendering...", counter); //used for debugging purposes
  return <div>{counter}</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));

//The function call adds state to the component and renders it initialized with the value of zero. The function returns an array that contains two items. We assign the items to the variables counter and setCounter by using the destructuring assignment syntax shown earlier.
//The counter variable is assigned the initial value of state which is zero. The variable setCounter is assigned to a function that will be used to modify the state
//When the state modifying function setCounter is called, React re-renders the component which means that the function body of the component function gets re-executed

//Event Handling

//In React, registering an event handler function to the click event happens like this:

const App = props => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}> plus </button>{" "}
    </div>
  );
};

//To have the counter go up and to have a button to reset the value we should have it like that

const App = props => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>plus</button>{" "}
      {/*Button to go up*/}
      <button onClick={() => setCounter(0)}> zero </button>{" "}
      {/*button to reset*/}
    </div>
  );
};

//Defining event handlers directly inside JSX-templates is usually not a wise move. Let's extract the event handler functions into their own separate helper functions

const App = props => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const setToZero = () => setCounter(0);
  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}> plus</button>
      <button onClick={setToZero}> zero</button>
    </div>
  );
};

//Event handlers are functions
//The functions increaseByOne and setToZero work almost exactly the same way, they just set a new value for the counter. Let's write a new function that serves both cases.

const App = props => {
  const [counter, setCounter] = useState(0);

  const setToValue = value => setCounter(value);

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setToValue(counter + 1)}> plus</button>
      <button onClick={() => setToValue(0)}> zero</button>
    </div>
  );
};

//Function that returns a function

const App = props => {
  const [counter, setCounter] = useState(0);

  const setToValue = value => {
    return () => {
      setCounter(value);
    };
  };
  return (
    <div>
      <div>{counter}</div>
      <button onClick={setToValue(counter + 1)}> plus</button>
      <button onClick={setToValue(0)}> zero</button>
    </div>
  );
};

//passing state to child components

//It's recommended to write React components that are small and reusable across the application and even across projects.

const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = props => {
  const [counter, setCounter] = useState(0);
  const setToValue = value => setCounter(value);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={() => setToValue(counter + 1)} text="plus" />{" "}
      <Button onClick={() => setToValue(counter - 1)} text="minus" />{" "}
      <Button onClick={() => setToValue(0)} text="zero" />
    </div>
  );
};
