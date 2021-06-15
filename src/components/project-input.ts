
import { Component } from './base-component.js';
// import Component from './base-component.js';
// import Cmp from './base-component.js';

import { Validatable, validate } from '../util/validation.js';
// import * as Validation from '../util/validation.js';

import { autobind } from '../decorators/autobind.js';
// import { autobind as Autobind} from '../decorators/autobind.js';

import { projectState } from '../state/project-state.js';


  // PROJECTINPUT CLASS
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

      // const titleValidatable: Validation.Validatable = {
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
        
        /* !Validation.validate(titleValidatable) || */
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

