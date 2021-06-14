
class Department {
  name: string;  // define the fields
  
  // initializes the fields/properties of the instance/object
  constructor(n: string) {
    this.name = n;
  }

  // methods/Functions
  describe() {
    console.log('Department: ' + this.name);
  }

  
  // describe1(this: Department) {
  //   console.log('Department1: ' + this.name);
  // }
}

// create an instance
const accounting = new Department('Accounting');
// console.log(accounting);

// accounting.describe();  // Output: "Department: Accounting"



// describe here is an object (just a normal object)
const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe();  // Output: "Department: undefined"



// THIS
// this refers to the things/instance/objects which are calling the methods
// in the above "accounting" and "accountingCopy"

// accountingCopy is an object with no name property. Hence when we try to call the describe method, we get "undefined"



const accountingCopy1 = { name: 'test', describe: accounting.describe };
// accountingCopy1.describe(); 






// PRIVATE, PROTECTED - ACCESS MODIFIERS

class Department1 {
  private name: string; 
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log('Department: ' + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}


const accounting1 = new Department1('Accounting');

// accounting1.addEmployee('Derek');
// accounting1.addEmployee('Lok');

// accounting1.employees[2] = "Season";  // if we don't use 'private' or 'protected'

// accounting1.describe();
// accounting1.printEmployeeInformation();





// SHORTHAND INITIALIZATION
abstract class Department2 {
  static fiscalYear = 2021;   // STATIC method. Cannot be accessed in Non-Static parts/methods/functions etc

  // public readonly id: string;
  // private name: string; 
  // private employees: string[] = [];
  protected employees: string[] = [];

  constructor(protected readonly id: string, private name: string) {
  // constructor(id: string, n: string) {
    // this.id = id;
    // this.name = n;
  };

  // STATIC METHOD
  static createEmployee(name: string) {
    return {name: name};
  }

  describe() {
    // console.log('Department '+ this.id +':'+ this.name);
    console.log(`Department (${this.id}): ${this.name}`);
  };


  // ABSTRACT CLASS
  // want classes derived from this case include this case, and keep/extends it
  abstract describe1(): void;


  addEmployee(employee: string) {
    // this.id = 'd2';   // will get error as "id" is readonly
    this.employees.push(employee);
  };

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  };
}



// const accounting2 = new Department2('d1' ,'Accounting')  // cannot create an instance of abstract class

// accounting2.addEmployee('Derek');
// accounting2.addEmployee('Lok');

// accounting2.describe();
// accounting2.printEmployeeInformation();





// INHERITANCE
class ITDepartment extends Department2 {
  constructor(id: string, public admins: string[]) {  
    super(id, 'IT');   // super() here calls the constructor of the base class (Department2)
  }

  static getInstance() {

  }

  describe1() {
    console.log('IT Department - ID: ' + this.id);
  }
};

class ITDepartment2 extends Department2 {
  admins: string[];   // same as above. Above method uses "public", and hence it's shorter
  constructor(id: string, admins: string[]) {
    super(id, 'IT');   
    this.admins = admins;  // if we use "this", we need to call it after we call "super()"
  }

   // including the ABSTRACT CLASS METHOD
  describe1() {
    console.log('IT Department - ID: ' + this.id);
  }
};



const employee1 = Department2.createEmployee('chaners');  // using a "static" method
console.log(employee1, Department2.fiscalYear);


// const IT = new ITDepartment('1' ,'IT')
const IT = new ITDepartment('1', ['Chan']);

IT.addEmployee('Derek');
IT.addEmployee('Lok');

// IT.describe();
// IT.printEmployeeInformation();

// console.log(IT);
IT.describe1();




class AccountingDepartment extends Department2{
  private lastReport: string;
  
  private static instance: AccountingDepartment;  // need this when we have a 'private constructor'

  // GETTER
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No Report Found');
  };

  // SETTER
  set mostRecentReport(value: string) {
    if (!value) {
      // return;
      throw new Error('Please pass in a value');
    }
    this.addReport(value);
  };


  // PRIVATE contructor - to make sure that only 1 instance can be created
  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  };

  // need this when we have a 'private constructor' / / SINGLETON
  static getInstance() {
    if (this.instance) {  // 'this' here refers to the class itself. 
    // if (AccountingDepartment.instance)  // same as above
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []); 
    return this.instance;
  };


  // including the ABSTRACT CLASS METHOD
  describe1() {
    console.log('Accounting Department - ID: ' + this.id);
  };


  describe() {
    console.log('Accounting Department - ID: ' + this.id);
  };


  // OVERRIDING PROPERTIES
  addEmployee(name: string) {
    if (name === 'Derek') {
      return;
    }
    this.employees.push(name);  // need to change from 'private' to 'protected' under base class Department2
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  getReport() {
    console.log(this.reports);
  }
};



// will get an error when we are using a 'private' constructor / SINGLETON, to make sure that only 1 instance of the class will be created
// const accountDep = new AccountingDepartment('d2', []);  
const accountDep = AccountingDepartment.getInstance();  // this returns a new instance of the department
const accountDep1 = AccountingDepartment.getInstance();  // this returns a new instance of the department

console.log(accountDep, accountDep1)

// console.log(accountDep.mostRecentReport);  // will get an error - 'No Report Found'

// accountDep.mostRecentReport = '';  // using a 'setter'.- will get an error - 'Please pass in a value'
accountDep.mostRecentReport = 'new report';  // using a 'setter'
console.log(accountDep.mostRecentReport);  // using a "getter" to access "private" properties

accountDep.addReport('Some report');
accountDep.getReport();

console.log(accountDep.mostRecentReport);  // using a "getter" to access "private" properties

accountDep.addEmployee('Derek');
accountDep.addEmployee('Simon');
// accountDep.printEmployeeInformation();

accountDep.describe();




