// https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps

//A more complex state, debugging React apps

//Complex state

//In the following code we create two pieces of state for the application named left and right that both get the initial value of 0
const App = props => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  return (
    <div>
      <div>
        {left}
        <button onClick={() => setLeft(left + 1)}>left</button>
        <button onClick={() => setRight(right + 1)}>right</button>
        {right}
      </div>
    </div>
  );
};

//t is forbidden in React to mutate state directly, since it can result in unexpected side effects. Changing state has to always be done by setting the state to a new object. If properties from the previous state object want to simply be copied, this has to be done by copying those properties into a new object.

//the component only has a single piece of state and the event handlers have to take care of changing the entire application state
const App = props => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  });

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1
    };
    setClicks(newClicks);
  };

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1
    };
    setClicks(newClicks);
  };

  return (
    <div>
      <div>
        {clicks.left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {clicks.right}
      </div>
    </div>
  );
};

//Handling arrays

//every click is stored inside allClicks and it is initialized as an empty array
//when the left button is clicked we add a "L" to the allClicks array
//We call the join method for the allClicks array that joins all the items into a single string, separated by the string passed as the function parameter, which in our case is an empty space.
const App = props => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };
  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };
  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(" ")}</p>{" "}
      </div>
    </div>
  );
};

//Conditional Rendering

//Let's modify our application so that the rendering of the clicking history is handled by a new History component

//if not button has been pressed a message appears
//after a button is pressed, the button press history appears
const History = props => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const App = props => {
  // ...

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <History allClicks={allClicks} />{" "}
      </div>
    </div>
  );
};

//Let's make one last modification to our application by refactoring it to use the Button component that we defined earlier on

const History = props => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text} </button>
);
const App = props => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="left" />{" "}
        <Button onClick={handleRightClick} text="right" /> {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  );
};

//Rules of Hooks

//The useState function (as well as the useEffect function introduced later on in the course) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component
//This must be done to ensure that the hooks are always called in the same order, and if this isn't the case the application will behave erratically.
//Example below
const App = props => {
  // these are ok
  const [age, setAge] = useState(0);
  const [name, setName] = useState("Juha Tauriainen");

  if (age > 10) {
    // this does not work!
    const [foobar, setFoobar] = useState(null);
  }

  for (let i = 0; i < age; i++) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false);
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000);
  };

  return 1; //just example
};

//Event Handling

//Event handlers must always be a function or a reference to a function. The button will not work if the event handler is set to a variable of any other type.
//Example

const App = props => {
  const [value, setValue] = useState(10);

  const handleClick = () => console.log("clicked the button");

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  );
};

//Do Not Define Components Within Components

// This is the right place to define a component
const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = props => {
  const [value, setValue] = useState(10);

  const setToValue = newValue => {
    setValue(newValue);
  };

  // Do not define components inside another component
  //the display component should be above the button component
  const Display = props => <div>{props.value}</div>;
  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
};
