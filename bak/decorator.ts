
// DECORATOR
// it's a function of which you apply to something, like a class, in a certain way

// "Decorators" are executed when your class is defined, not when it is instantiated
// The decorator runs when JAvascript finds the class definition, the construction function definition, 
// not when you use the construction to instantiated the object

// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log(constructor);
// };

function Logger(target: Function) {
  console.log('Logging...');
  console.log(target);
};

// @Logger
class Person {
  name = 'Derek';

  constructor() {
    console.log('Creating person object...')
  }
};

// const person  = new Person();
// console.log(person);




// DECORATOR FACTORIES

function Logger1(logStream: string) {
  console.log('LOGGER FACTORY')
  return function(constructor: Function) {
    console.log(logStream);
    console.log(constructor);
  };
}

/*
@Logger1('logging - person')
class Person1 {
  name = 'Derek';

  constructor() {
    console.log('Creating person1 object...')
  }
};

const person1  = new Person1();
console.log(person1);
*/


/*
function WithTemplate(template: string, hookId: string) {
  // return function(constructor: Function) {
  return function(_: Function) {   // the underscore is telling that we don't need the constructor
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
  }
};

@WithTemplate('<h1>My person object</h1>', 'app')
class Person2 {
  name = 'Derek';

  constructor() {
    console.log('Creating person2 object...')
  }
};
*/


function WithTemplate2(template: string, hookId: string) {
  // return function(originalConstructor: any) {
  return function<T extends {new (...args: any[]): {name: string}} >(originalConstructor: T) {

  // return function(_: Function) {   // the underscore is telling that we don't need the originalConstructor
    // console.log('TEMPLATE FACTORY')
    // const hookEl = document.getElementById(hookId);
    // const p = new originalConstructor();
    // if (hookEl) {
    //   hookEl.innerHTML = template;
    //   hookEl.querySelector('h1')!.textContent = p.name;
    // }

    // decorator returning a new class
    // this is a new constructor function / class, which replaces the original constructor "class Person3 from below"
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super();   // calls the original class - "class Person3" below, and we save everything which were "instantiiated"

        // below is the extra logic / functions that we can add after calling super(), after the class is "instantiated", not when they run
        console.log('TEMPLATE FACTORY')
        const hookEl = document.getElementById(hookId);
        // const p = new originalConstructor();
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        };
      };
    };
  };
};


// ADDING MULTIPLE DECORATORS

// "creation" of the decorator functions - from top to bottom
// "execution" of the decorator functions - from bottom to top

@Logger1('LOGGING')
@WithTemplate2('<h1>My person object2</h1>', 'app')
class Person3 {
  name = 'DerekChan';

  constructor() {
    console.log('Creating person3 object...')
  }
};


const pers = new Person3();
console.log(pers);





// PROPERTY DECORATORS

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator');   // decorator executes here
  console.log(target, propertyName);   // decorator executes here
};



// ACCESSOR, METHOD & PARAMETER DECORATORS

// "target" here can either be the "Prorotype" if we are dealing with an instance, accessor, or
// if we are dealing with a static one, it would be the constructor function.

// "name" of the member. In this case it will be the "Accessor".  // Accessor Decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor Decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
};


// add decorators to "Methods" // Method Decorator
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method Decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
};


// "Parameter" Decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter Decorator');
  console.log(target);
  console.log(name);
  console.log(position);
};


class Product {
  @Log    // add decorator to a property
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive')
    }
  };

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  };

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  };
};





// AUTOBINF DECORATOR

function Autobind(target: any, methodName: string | Symbol | number, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
};


class Printer {
  message = 'This works';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
};

const p = new Printer();


const button = document.querySelector('button')!;

// will get undefined. Not the same as just calling p.showMessage outside the fn
 
// button.addEventListener('click', p.showMessage.bind(p));
button.addEventListener('click', p.showMessage); 






// VALIDATION AND DECORATORS

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]   // ['required', 'positive']
  }
};

const registerValidators: ValidatorConfig = {};


function Required(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: ['required']
  };
};

function PositiveNumber(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: ['positive']
  };
};

function validate(obj: any) {
  const objValidatorConfig = registerValidators[obj.constructor.name];
  if (!objValidatorConfig) {  // if nothing to validate, then it means that the data passed in are ok / validated
    return true;
  };

  let isValid = true;
  for (const prop in objValidatorConfig) {  // go through the object and get the property names 'Required' and 'PositiveNumber' (I think)
    console.log(prop);
    for (const validator of objValidatorConfig[prop]) {  // go through the array and find the properties, eg 'required', 'positive'
      switch (validator) {
        case 'required':
          // return !!obj[prop];  // to convert to a boolean value
          isValid = isValid && !!obj[prop];  // to convert to a boolean value
          break;
        case 'positive':
          // return obj[prop] > 0;
          isValid = isValid && obj[prop] > 0;
          break;
      } 
    } 
  }
  // return true;
  return isValid;
};


class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  };
};

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', e => {
  e.preventDefault();

  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  // if (title.trim().length > 0) {}

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }

  console.log(createdCourse) 
});
