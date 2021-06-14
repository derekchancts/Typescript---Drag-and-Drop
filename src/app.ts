
// PROJECT TYPE
enum ProjectStatus {Active, Finished};

class Project {
  constructor(
    public id: string, 
    public title: string,
    public description: string, 
    public people: number,
    // public status: 'active' | 'finished'
    public status: ProjectStatus
  ) {}
};



// PROJECT STATE MANAGEMENT
type Listener = (items: Project[]) => void;
 

class ProjectState {
  // private listeners: any[] = [];  // list of listeners. Will be called when something changes
  private listeners: Listener[] = [];  // list of listeners. Will be called when something changes
  // private projects: any[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {

  };

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  };

  // addListener(listenerFn: Function) {
  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  };

  addProject(title: string, description: string, numOfPeople: number) {
    // const newProject = {
    //   id: Math.random().toString(),
    //   title: title,
    //   description: description,
    //   people: numOfPeople
    // };
    const newProject = new Project(
      Math.random().toString(), 
      title, 
      description, 
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);

    for (const listenerFn of this.listeners) {   // loop through this.listeners array 
      // return a "copy" of the array, and not the original copy, so that it cannot be edited 
      // from the place where the listeners are coming from.
      listenerFn(this.projects.slice());  
    }
  }
};

// const projectState = new ProjectState();
const projectState = ProjectState.getInstance();




// VALIDATION

// alternative can use "type" or use a class. Then we instanticate it later
interface Validatable {
  value: string | number;
  required?: boolean;   // the same:  required: boolean | undefined 
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
};

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    // if (typeof validatableInput.value === 'string') 
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // "!= null" meaning null or undefined. Else, we will have a problem if the value is zero
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
};



// ADD AUTOBIND DECORATOR
function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  // console.log(originalMethod);
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      // console.log(boundFn);
      return boundFn;
    }
  };
  // console.log(adjDescriptor);
  return adjDescriptor;
};



// PROJECTLIST CLASS
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  // assignedProjects: any[];
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    // register a listner function here
    // projectState.addListener((projects: any[]) => {
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(proj => {  // FILTER THE PROJECT TYPES
        if (this.type === 'active') {
          return proj.status === ProjectStatus.Active
        }
        return proj.status === ProjectStatus.Finished
      });
      // this.assignedProjects = projects;
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
    
    this.attach();
    this.renderContent();
  };

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
    listEl.innerHTML = '';
    
    for (const prjItems of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = prjItems.title;
      listEl.appendChild(listItem);
    }
  };
  
  // private addProject() {};

  private renderContent() {
    const listId = `${this.type}-project-list`;  // this.type = 'active' or 'finished'
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';  // 'active' or 'finished'
  };

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  };
};



// PROJECTINPUT CLASS
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;  // or it could be just HTMLElement
  element: HTMLFormElement;  // or it could be just HTMLElement
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    // this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    // console.log(importedNode.firstElementChild)   // the whole form
    this.element = importedNode.firstElementChild as HTMLFormElement;
    // console.log(this.element)  // // the whole form
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

    this.configure();
    this.attach();
  };


  // private gatherUserInput(): [string, string, number] | undefined { 

  // should use "void" instead of undefined in functions - at least a branch which does not return any value
  private gatherUserInput(): [string, string, number] | void {   
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5
    };

    // if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) 
    if (
      // validate({value: enteredTitle, required: true, minLength: 5}) && 
      // validate({value: enteredDescription, required: true, minLength: 5}) && 
      // validate({value: enteredPeople, required: true, minLength: 5}) 
      !validate(titleValidatable) || 
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
      // throw new Error('Invalid input, please try again!)
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  };


  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  };


  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();

    // will get an error - "Cannot read property 'value' of undefined"
    // "this" here under submitHandler does not point to the class, it will be bound to the current target of the event

    // console.log(this.titleInputElement.value);

    const userInput = this.gatherUserInput();

    // tuple is an array. So, if we get an array here, then we have a tuple. Otherwise, it's empty
    if (Array.isArray(userInput)) {  
      const [title, desc, people] = userInput;
      console.log(title, desc, people);

      // one way is then use getElementById and grab a reference to  // const listId = `${this.type}-project-list`; 
      // max decided to use something like Redux with a shared state
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  };


  private configure() {
    // "this" here binds the method submitHandler with the event listenser, and when we bind something to an event,
    // that method "submitHandler" (which will get executed), have have "this" bound to something else
    // solution - add "bind(this)", which makes "this" from the method submitHandler, points to the same thing
    // as teh method "configure". Since "this.configure()" will be referring to the class "ProjectInput", and so will submitHandler

    // this.element.addEventListener('submit', this.submitHandler.bind(this));
    this.element.addEventListener('submit', this.submitHandler);
  };


  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  };
};


const projInput = new ProjectInput();

const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');