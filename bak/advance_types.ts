
// INTERSECTION TYPES
// allows us to combine other types

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Derek',
  privileges: ['create-server'],
  startDate: new Date(),
}



/*
interface Admin1 {
  name: string;
  privileges: string[];
};

interface Employee1 {
  name: string;
  startDate: Date;
};

// type ElevatedEmployee1 = Admin & Employee;

interface ElevatedEmployee1 extends Admin1, Employee1 {};


const e2: ElevatedEmployee1 = {
  name: 'Derek',
  privileges: ['create0-server'],
  startDate: new Date(),
}
*/


type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;




// TYPE GUARDS
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {   // TYPE GUARD
    return a.toString() + b.toString();
  } 
  return a + b;
}



type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);

  // even if we use the 'typeof' check, it will not work. It checks this on 'runtime' and uses "Javascript"
  // if (typeof === 'object') - this only tell whether it is an object or not, but don't tell us the properties
  // if (typeof === 'Employee') - Javascript do not know this (custom)type. So, it wouldn't work

  if('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }
  if('startDate' in emp) {
    console.log('StartDate: ' + emp.startDate);
  }
};

printEmployeeInformation(e1);




// when using CLASSES, we have another type guard - 'INSTANCE OF'
class Car {
  drive() {
    console.log('Driving...');
  };
};

class Truck {
  drive() {
    console.log('Driving a truck...');
  };

  loadCargo(amount: number) {
    console.log('Loading cargo...' + amount);
  };
};

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  if ('loadCargo' in vehicle) {
    vehicle.loadCargo(1000); 
  };

  if (vehicle instanceof Truck) {  // CLASSES - can use 'instanceof'. Cannot use this with INTERFACE
    vehicle.loadCargo(100); 
  }
};

useVehicle(v1);
useVehicle(v2);




// DISCRIMINATED UNIONS
// it's a pattern, which is a type guard, when using union types a bit easier
// it is available when you are using "OBJECT" types
// we have at least one "common" types which makes up our UNION, which describes our object

// could use interfaces or classese here
interface Bird {
  type: 'bird';   // type assignment / literal type
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';  // type assignment / literal type
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving with speed: ' + speed)
}

moveAnimal({ type: 'bird', flyingSpeed: 10})
moveAnimal({ type: 'horse', runningSpeed: 20})




function moveAnimal1(animal: Animal) {
  if ('flyingSpeed' in animal) {
    console.log('Moving at speed: ' + animal.flyingSpeed)
  }
  if ('runningSpeed' in animal) {
    console.log('Moving at speed: ' + animal.runningSpeed)
  }
}

moveAnimal1({ type: 'bird', flyingSpeed: 100});
moveAnimal({ type: 'horse', runningSpeed: 120});




// TYPE CASTING
const paragraph = document.querySelector('p');
const paragraph1 = document.querySelector('#message-output') as HTMLParagraphElement;

const input = document.querySelector('#user-input') as HTMLInputElement;
input.value = 'hi there'

const input1 = <HTMLInputElement>document.querySelector('#user-input')!;
input1.value = 'hi hi there'

const input2 = document.querySelector('#user-input');
if (input2) {
  (input2 as HTMLInputElement).value = 'hi hi hi there'
};




// INDEX PROPERTIES
// this is useful when we do not know in advance the 'properties names 'and how many 'properties' we'll need 
interface ErrorContainer { // {email: 'Not a valid email', username: 'must have at least 6 chars'}
  // prop can be other names like 'key'. The 'prop' and value must be a 'string' as defined below, but can be other types

  // id: string;  // can set defined properties, but must be the same type from the index properties.
  [prop: string]: string;  
};

const errorBag: ErrorContainer = {
  email: 'Not a valid email', 
  username: 'must have at least 6 chars'
};





// FUNCTION OVERLOADS

type Combinable1 = string | number;
type Numeric1 = number | boolean;
type Universal1 = Combinable & Numeric;

// function add1(a: number): number;
function add1(a: number, b: number): number;
function add1(a: string, b: string): string;
function add1(a: number, b: string): string;
function add1(a: string, b: number): string;
function add1(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {   // TYPE GUARD
    return a.toString() + b.toString();
  } 
  return a + b;
}


// const result = add(1, 5);

// result will be either string or number. However, cannot use the string methods like 'split'
// const result = add("Derek", " Chan") as string;  // option - can add 'as string', but it is not ideal
// so, we can use 'FUNCTION OVERLOAD' to add different combinations
const result = add1("Derek", " Chan");  
console.log(result.split(' '))





// OPTIONAL CHAINING
const fetchedUserData = {
  id: 'u1',
  name: 'Derek',
  job: {title: 'CEO', description: 'My own company'}
};

console.log(fetchedUserData?.job?.title);





// NULLISH COALESCING
// you don't know whether some data is 'null', 'undefined' or could be valid

// const userInput = null;
const userInput = '';

// const storedData = userInput || 'Default';

// the 2 question marks = 'Nullish Coalescing'. For 'null' or 'undefined' only.
const storedData = userInput ?? 'Default';  

console.log(storedData);