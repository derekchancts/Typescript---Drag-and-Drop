function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  // console.log(typeof n1)

  // non Typescript way
  // if (typeof n1 !== 'number' || typeof n1 !== 'number') {
  //   throw new Error('Incorrect input type')
  // }

  const result = n1 + n2
  if (showResult) {
    console.log(phrase + result)
  } else {
    // return n1 + n2;
    return result;
  }
}

const number1 = 1;
const number2 = 2;
const printResult = true;
const resultPhrase = "Result is: "

// const result = add(1, 2, printResult);
// console.log(result)

add(number1, number2, printResult, resultPhrase);