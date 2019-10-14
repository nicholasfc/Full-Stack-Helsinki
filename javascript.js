//https://fullstackopen.com/en/part1/javascript

//Variables

//const - does not actually define a variable but a constant for which the value can no longer be changed
//let - defines a normal variable

const x = 1;
let y = 5;

console.log(x, y); // 1, 5 are printed
y += 10;
console.log(x, y); // 1, 15 are printed
y = "sometext";
console.log(x, y); // 1, sometext are printed
x = 4; // causes an error

//Arrays

//The contents of the array can be modified even though it is defined as a const.
//Because the array is an object the variable always points to the same object.
//The content of the array changes as new items are added to it.

const t = [1, -1, 3];

t.push(5);

console.log(t.length); // 4 is printed
console.log(t[1]); // -1 is printed

t.forEach(value => {
  console.log(value); // numbers 1, -1, 3, 5 are printed, each to own line
});

//forEach - receives a function defined using the arrow syntax as a parameter.
//forEach calls the function for each of the items in the array, always passing the individual item as a parameter.

//concat, which does not add the item to the array, but creates a new array in which the content of the old array and the new item are both included.
//The method call t.concat(5) does not add a new item to the old array but returns a new array which, besides containing the items of the old array, also contains the new item.

const t = [1, -1, 3];

const t2 = t.concat(5);

console.log(t); // [1, -1, 3] is printed
console.log(t2); // [1, -1, 3, 5] is printed

//map creates a new array, for which the function given as a parameter is used to create the items. In the case of this example the original value is multiplied by two.

const t = [1, 2, 3];

const m1 = t.map(value => value * 2);
console.log(m1); // [2, 4, 6] is printed

//Map can also transform the array into something completely different

const m2 = t.map(value => "<li>" + value + "</li>");
console.log(m2);
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed

//destructuring assignment - hanks to the assignment the variables first and second will receive the first two integers of the array as their values. The remaining integers are "collected" into an array of their own which is then assigned to the variable rest.

const t = [1, 2, 3, 4, 5];

const [first, second, ...rest] = t;

console.log(first, second); // 1, 2 is printed
console.log(rest); // [3, 4 ,5] is printed

//Objects

//object literals, which happens by listing its properties within braces
//The values of the properties can be of any type, like integers, strings, arrays, objects

const object1 = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD"
};

const object2 = {
  name: "Full Stack web application development",
  level: "intermediate studies",
  size: 5
};

const object3 = {
  name: {
    first: "Dan",
    last: "Abramov"
  },
  grades: [2, 3, 5, 3],
  department: "Stanford University"
};

//The properties of an object are referenced by using the "dot" notation, or by using brackets

console.log(object1.name); // Arto Hellas is printed
const fieldName = "age";
console.log(object1[fieldName]); // 35 is printed

//You can also add properties to an object on the fly by either using dot notation or using brackets
object1.address = "Helsinki";
object1["secret number"] = 12341;

//Object Methods and this keyword

//We can assign methods to an object by defining properties that are functions
const arto = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",
  greet: function() {
    console.log("hello, my name is", this.name);
  }
};

arto.greet(); // hello, my name is Arto Hellas gets printed

//Methods can be assigned to object even after the creation of the object

const arto = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",
  greet: function() {
    console.log("hello, my name is", this.name);
  }
};

arto.growOlder = function() {
  this.age += 1;
};
console.log(arto.age); // 35 is printed
arto.growOlder();
console.log(arto.age); // 36 is printed

//Now the object has the method doAddition which calculates the sum of numbers given to it as parameters. The method is called in the usual way using the object arto.doAddition(1, 4) or by storing a method reference in a variable and calling the method through the variable referenceToAdditon(10, 15)
const arto = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",
  greet: function() {
    console.log("hello, my name is", this.name);
  },
  doAddition: function(a, b) {
    console.log(a + b);
  }
};

arto.doAddition(1, 4); // 5 is printed

const referenceToAdditon = arto.doAddition;
referenceToAdditon(10, 15); // 25 is printed

//If we try to do the same with the method greet we run into an issue
arto.greet(); // hello, my name is Arto Hellas gets printed

const referenceToGreet = arto.greet;
referenceToGreet(); // error message is printed to console

//Classes

//In the following we have defined a "class" called Person and two Person objects
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log("hello, my name is", this.name);
  }
}

const adam = new Person("Adam Ondra", 35);
adam.greet();

const janja = new Person("Janja Garnbret", 22);
janja.greet();
