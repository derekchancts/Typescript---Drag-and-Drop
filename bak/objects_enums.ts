
// OBJECT

// const person: object = { 
//   name: 'Derek',
//   age: 30
// };

// console.log(person.name); // will yield an error as Typescript only knows this is an object



// const person: {
//   name: string;
//   age: number;
// } = {
//   name: 'Derek',
//   age: 30
// };


// let Typescript to get the types by inference, which is the more prefer way
const person = {
  name: 'Derek',
  age: 30
};

// console.log(person.nickname);
// console.log(person.name);




// ARRAYS
const person1 = {
  name: 'Derek',
  age: 30,
  hobbies: ['Sports', 'Cooking']
};

for ( const hobby of person1.hobbies ) {
  // console.log(hobby.toUpperCase());  // have access to String methods 
 // console.log(hobby);
}




// TUPLES - fixed length and type array
const person2: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];   // tuple
} = {
  name: 'Derek',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author']
};

// person2.role.push('admin');   // tuple allows 'push' method, and so will not be able to catch this error
// person2.role[1] = 10;   // will get an error

// person2.role = []   // will get an error
person2.role = [0, 'admin']
// person2.role = [0, 'admin', 'user']   // will get an error






// ENUMS

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role { ADMIN, READ_ONLY, AUTHOR };

const person3 = {
  name: 'Derek',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.AUTHOR
};

if (person3.role === Role.AUTHOR) {
  console.log('is author');
}