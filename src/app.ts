
// DRAG AND DROP INTERFACES
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
};

interface DragTarget {
  // inform the browser that the item is a valid drag target. Emit the drag
  dragOverHandler(event: DragEvent): void; 

  // hanlde the drag
  dropHandler(event: DragEvent): void;  

  // update the user (with visual effects for example)
  dragLeaveHandler(event: DragEvent): void;  
};



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
// type Listener = (items: Project[]) => void;
type Listener<T> = (items: T[]) => void;


// COMPONENT BASE CLASS
class State<T> {
  // private listeners: Listener<T>[] = []; 
  protected listeners: Listener<T>[] = []; 

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  };
};
 


class ProjectState extends State<Project> {
  // private listeners: Listener[] = [];  // list of listeners. Will be called when something changes
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super()
  };

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  };

  // addListener(listenerFn: Function) {
  // addListener(listenerFn: Listener) {
  //   this.listeners.push(listenerFn);
  // };

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
    this.updateListeners();

    // for (const listenerFn of this.listeners) {   // loop through this.listeners array 
        // return a "copy" of the array, and not the original copy, so that it cannot be edited 
        // from the place where the listeners are coming from.
    //   listenerFn(this.projects.slice());  
    // };
  };


  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);

    if (project && project.status !== newStatus) {  // update only if we change something
      project.status = newStatus;
      this.updateListeners();
    }
  };


  private updateListeners() {
    for (const listenerFn of this.listeners) {   // loop through this.listeners array 
      // return a "copy" of the array, and not the original copy, so that it cannot be edited 
      // from the place where the listeners are coming from.
      listenerFn(this.projects.slice());  
    };
  };

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




// COMPONENT BASE CLASS

// abstract - meaning that it should not be directly instantiated 
// instead, it should always be used as "inheritance"
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string, 
    hostElementId: string, 
    insertAtStart: boolean,
    newElementId?: string,
  ) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;

    if (newElementId) {
      this.element.id = newElementId;
    };

    this.attach(insertAtStart);
  };

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend', 
      this.element
    );
  };

  abstract configure(): void;

  abstract renderContent(): void;  // public method
};



// PROJECTITEM CLASS
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  // GETTER
  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  };

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  };

  @autobind
  dragStartHandler(event: DragEvent) {
    // console.log(event)
    event.dataTransfer!.setData('text/plain', this.project.id);  // the data to be transferred/moved
    event.dataTransfer!.effectAllowed = 'move';  // this controls how the cursor will look like
  };

  @autobind
  dragEndHandler(event: DragEvent) {
    console.log('DragEnd');
  };

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
    //this.element.addEventListener('dragstart', this.dragStartHandler.bind(this));
  };

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    // this.element.querySelector('h3')!.textContent = this.project.people.toString() + ' assigned';
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;

  };
};



// PROJECTLIST CLASS

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget { 
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`)
    this.assignedProjects = [];

    // register a listner function here
    // projectState.addListener((projects: Project[]) => {
    //   const relevantProjects = projects.filter(proj => {  // FILTER THE PROJECT TYPES
    //     if (this.type === 'active') {
    //       return proj.status === ProjectStatus.Active
    //     }
    //     return proj.status === ProjectStatus.Finished
    //   });
    //   // this.assignedProjects = projects;
    //   this.assignedProjects = relevantProjects;
    //   this.renderProjects();
    // });
    
    this.configure();
    this.renderContent();
  };

  @autobind
  dragOverHandler(event: DragEvent) {
    // if the item is allowed to be transferred, and if the item is 'plain text'
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();

      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  };

  @autobind  // so that "this" will point to the surrounding class "ProjectList"
  dropHandler(event: DragEvent) {
    // console.log(event.dataTransfer!.getData('text/plain'));
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);

  }; 

  @autobind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  };

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
    listEl.innerHTML = '';

    for (const prjItems of this.assignedProjects) {
      // const listItem = document.createElement('li');
      // listItem.textContent = prjItems.title;
      // listEl.appendChild(listItem);

      new ProjectItem(this.element.querySelector('ul')!.id, prjItems);
    }
  };


  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    // register a listner function here
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
  };

  // private renderContent() {
  renderContent() {
    const listId = `${this.type}-project-list`;  // this.type = 'active' or 'finished'
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';  // 'active' or 'finished'
  };
};



// PROJECTINPUT CLASS
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

    this.configure();
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


  // private configure() {
  configure() {
    // "this" here binds the method submitHandler with the event listenser, and when we bind something to an event,
    // that method "submitHandler" (which will get executed), have have "this" bound to something else
    // solution - add "bind(this)", which makes "this" from the method submitHandler, points to the same thing
    // as the method "configure". Since "this.configure()" will be referring to the class "ProjectInput", and so will submitHandler

    // this.element.addEventListener('submit', this.submitHandler.bind(this));
    this.element.addEventListener('submit', this.submitHandler);
  };

  renderContent() {};

};


const projInput = new ProjectInput();

const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');