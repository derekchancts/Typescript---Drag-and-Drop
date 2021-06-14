// FUNCTION RETURN TYPES
function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log(num);
}

// printResult(add(5, 6));





// FUNCTION AS TYPES 
// they are types which describe a function regarding parameters and the return value of that function

// let combineValues: Function;
let combineValues: (a: number, b: number) => number;  // takes 2 paramters, and return a number

combineValues = add;  // store reference (pointer) to add function, in combineValues
// combineValues = 5;  // this will cause a runtime error 

// console.log(combineValues(8, 8));





// FUNCTION TYPES & CALLBACKS
//  cb: (num: number) => void - ignore any result that we are returning here / will not be used
function addAndHandle(n1: number, n2: number, cb: (num: number) => void ) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 12, (result) => {
  console.log(result);
  // return result;  // typescript does not pick up this, even though we explicitly say return void.
});





