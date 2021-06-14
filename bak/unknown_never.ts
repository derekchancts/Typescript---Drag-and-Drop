// UNKOWN TYPE
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Derek';


// with "unknown", we need to check the type before we assign it (so not the same as "any" type)
// userName = userInput;  // will get an error - Type 'unknown' is not assignable to type 'string'.

// typescript detexts this check
if (typeof userInput === 'string') {
  userName = userInput;
}





// NEVER TYPE
function generateError(message: string, code: number) {
  // this crashes / exit the script. Hence, it will provide "never" type - never produces a value 
  // never return anything
  throw {message: message, errorCode: code};  
}

const result = generateError('An error occurred', 500);
console.log(result)  // if this is a normal functio, it would return "undefined"


// while (true) - an infinite loop is another exmaple which will return "never" type