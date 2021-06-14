
// GENERICS

// const names = ['Derek', 'Lok'];
const names: Array<string> = [];   // string[]
// names[0].split(' ');


const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('done');
  }, 2000);
});

promise.then(data => {
  data.split(' ');  // we can use string method here because we have defined the type above
});





// CREATING A GERERIC FUNCTION

// typescript only know it's an object, it doesn't know it's properties
function merge(objA: object, objB: object) {  
  return Object.assign(objA, objB);
};

// console.log(merge({name: 'Derek'}, {age: 30}));
// const mergeObj = merge({name: 'Derek'}, {age: 30}) as {name: string, age: number};

const mergeObj = merge({name: 'Derek'}, {age: 30});
// mergeObj.name  // cannot access the name property, or age property


// intersection of type T and U
// "TYPE CONSTRAINT" - extends object
// can extend other types - string, number, union, custom type
function merge1<T extends object, U extends object>(objA: T, objB: U) { 
  return Object.assign(objA, objB);
};

const mergeObj1 = merge1({name: 'Derek', hobbies: ['sports']}, {age: 30});
// console.log(mergeObj1.name, mergeObj1.age);

// The below is "reduntant"
// const mergeObj2 = merge1<{name: string}, {age: number}>({name: 'Derek'}, {age: 30});




// WORKING WITH CONSTRAINTS

// const mergeObj3 = merge1({name: 'Derek', hobbies: ['sports']}, 30);   // with "type constraint", we will get an error 
// console.log(mergeObj3)



interface Lengthy {
  length: number
};

function countandDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = 'Got 1 element';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements'
  }
  return [element, descriptionText];
}

// console.log(countandDescribe('Hi there'));
// console.log(countandDescribe(['Sports', 'Cooking']));
// console.log(countandDescribe(''));





// 'KEYOF' Constraint

// function extractAndConvert(obj: object, key: string) {
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'value: ' + obj[key];
};

// console.log(extractAndConvert({}, 'name'));

extractAndConvert({name: 'Derek'}, 'name');





// GENERIC CLASSES

// "Generic" - choose 1 of these types ONLY. if "Union" - can be a mixture

// class DataStorage<T> {
class DataStorage<T extends string | number | boolean> {   
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    // remove an element from an array. if it cannot find any, it will remove the last element from the array ( -1 )
    // this.data.splice(this.data.indexOf(item), 1);  

    if (this.data.indexOf(item) === -1) {  // if cannot find any element
      return;
    }
  }

  getItems() {
    return [...this.data];  
  }
};


const textStorage = new DataStorage<string>();
textStorage.addItem('Simon');
textStorage.addItem('David');
textStorage.removeItem('David');
// console.log(textStorage.getItems());


const numberOrStringStorage = new DataStorage<number | string>();


/*
const objectStorage = new DataStorage<object>();

const someObj = {name: 'Alan'};
// objectStorage.addItem({name: 'Alan'});
objectStorage.addItem(someObj);

objectStorage.addItem({name: 'Brian'});
// ...
//objectStorage.removeItem({name: 'Alan'});  // this is a brand new memory with a different address 
objectStorage.removeItem(someObj);   

console.log(objectStorage.getItems());
*/





// GENERIC UTILITY TYPES

// PARTIAL - Constructs a type with all properties of Type set to optional. 
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
};

function createCourse(title: string, description: string, date: Date): CourseGoal {
  return {title, description, completeUntil: date};
};

function createCourse1(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};  // Constructs a type with all properties of Type set to optional. 
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}



// READONLY
const names1: Readonly<string[]> = ['Derek', 'Ashley'];
// names1.push('Cathy');   // will get an error if we do this
// names1.pop();   // will get an error if we do this






// GENERIC TYPES vs "UNION TYPES"

// "Generic" - choose 1 of these types ONLY. if "Union" - can be a mixture

/*
class DataStorage1 {
  // private data: (string | number | boolean)[] = [];  // the array can be a mixed type array
  private data: string[] | number[] | boolean[] = [];  // UNION TYPE

  addItem(item: string | number | boolean) {
    this.data.push(item);
  };

  removeItem(item: string | number | boolean) {
    // remove an element from an array. if it cannot find any, it will remove the last element from teh array ( -1 )
    // this.data.splice(this.data.indexOf(item), 1);  

    if (this.data.indexOf(item) === -1) {  // if cannot find any element
      return;
    }
  };

  getItems() {
    return [...this.data];  
  };
}


const textStorage1 = new DataStorage1();
textStorage.addItem('Simon');
textStorage.addItem('David');
textStorage.removeItem('David');
// console.log(textStorage.getItems());


const numberOrStringStorage1 = new DataStorage1();
*/