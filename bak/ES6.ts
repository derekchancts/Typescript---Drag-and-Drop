
// VAR 
// if declared outside a FUNCTION - it's available globally
// if inside a FUNCTION, it's only available within that FUNCTION



function add(a: number, b: number) {
  var result;
  result = a + b;
  return result
};

// console.log(result)  // will get an error



var result1;

function add1(a: number, b: number) {
  result1 = a + b;
  return result1
};

// console.log(result1);





let result2;

function add2(a: number, b: number) {
  result2 = a + b;
  return result2
};

// console.log(result2);




function add3(a: number, b: number) {
  let result3;
  result3 = a + b;
  return result3
};

// console.log(result3);   // will get an error




// if (age > 20) {
//   var isOld = true   // still global scope
// }

// console.log(isOld); 



// if (age > 20) {
//   let isOld = true   // block scope
// }




// ARROW FUNCTION
const adder = (a: number, b: number) => a + b;

const printOutput = (output: string | number) => console.log(output);

// printOutput(adder(2, 3));



// Default Parameter
const adder1 = (a: number, b: number = 1) => a + b;

const printOutput1 = (output: string | number) => console.log(output);

// printOutput1(adder1(2, 3));
// printOutput1(adder1(2));




// SPREAD OPERATOR
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];  
const activeHobbies1 = ['Football', ...hobbies]

// array are objects, and objects are reference values.
// when we push, we change the memory, but NOT the address
// activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push(...hobbies);  // ...hobbies will be treated as a list of individual values here
// console.log(activeHobbies)
// console.log(activeHobbies1)



const person = {
  name: 'Derek',
  age: 40
}

const copiedPerson = person;  // we are copying the pointer

const copiedPerson1 = { ...person };  // we make a copy of the person




// REST PARAMETERS
const adding = (...numbers: number[]) => {
  let result;
  result = numbers.reduce((curResult, curValue) => {
    return curResult + curValue
  }, 0);
  return result;
};

const addNumbers = adding(1, 2, 3, 4, 5);
// console.log(addNumbers)



const adding1 = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue
  }, 0);

};

const addNumbers1 = adding1(1, 2, 3, 4, 5);
// console.log(addNumbers1)






// ARRAY & OBJECT DESTRUCTURING

const hobbies1 = ['Sports', 'Cooking'];

// const hobby1 = hobbies1[0];
// const hobby2 = hobbies1[1]; 

// Destructing does not change the original array

// ...remainingHobbies will include any remaining items and store them in a new array
// in arrays, they are pulled out in order
const [ hobby1, hobby2, ...remainingHobbies ] = hobbies1;
console.log(hobby1, hobby2)




const person1 = {
  firstName: 'Derek',
  age: 40
};

// in object, we pull the objects out by key names, they have to be the same names 
const { firstName, age } = person1;