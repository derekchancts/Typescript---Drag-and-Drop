
// INTERFACE
// an insterface describes the structure of an OBJECT, describe how an object should look like
// can use an interface as a 'type'

/*
interface Person {
// type Person = {
  name: string;
  age: number;

  greet(phrase: string): void;
};


let user1: Person;

user1 = {
  name: 'Derek',
  age: 40,
  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}

user1.greet('hello');
*/



// USING TYPE
// type AddFn = (a: number, b: number) => number;

// INTERFACES as FUNCTION TYPES / CUSTOM FUNCTION TYPE  (functions as just onjects)
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
}



interface Named {
  readonly name: string;
  outputName?: string
};


interface Greetable extends Named {
  greet(phrase: string): void;
};


// you can implment multiple interfaces

// class Person implements Greetable, Named {
class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name);
  }
}


let user1: Greetable;

user1 = new Person('Derek');

user1.greet('Hello');
// user1.name = 'max'  // will get an error, as it is 'readonly

console.log(user1)

