// UNION TYPES
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26);
// console.log(combinedAges);

const combineNames = combine("Hi", "There");
// console.log(combineNames)




// literal types
function combine1(
  input1: number | string,
  input2: number | string,
  resultConversion: string
) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  if (resultConversion === "as-number") {
    return +result;
  } else {
    return result.toString();
  }
}

const combinedAges1 = combine1(30, 26, "as-number");
console.log(combinedAges1);

const combinedStringAges1 = combine1("30", "26", "as-number");
console.log(combinedStringAges1);

const combineNames1 = combine1("Hi", "There", "as-text");
console.log(combineNames1);




function combine2(
  input1: number | string,
  input2: number | string,
  resultConversion: string
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;

  // if (resultConversion === 'as-number') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combinedAges2 = combine2(30, 26, "as-number");
console.log(combinedAges2);

const combinedStringAges2 = combine2("30", "26", "as-number");
console.log(combinedStringAges2);

const combineNames2 = combine2("Hi", "There", "as-text");
console.log(combineNames2);




function combine3(
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-text'   // literal type
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}


const combinedAges3 = combine3(30, 26, "as-number");
console.log(combinedAges3);

const combinedStringAges3 = combine3("30", "26", "as-number");
console.log(combinedStringAges3);

const combineNames3 = combine3("Hi", "There", "as-text");
console.log(combineNames3);






// TYPE ALIASES 

type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine4(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor  
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}