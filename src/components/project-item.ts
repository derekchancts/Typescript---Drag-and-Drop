
import { Draggable } from '../models/drag-drop.js';
import { Component } from './base-component.js';
import { Project } from '../models/project.js';
import { autobind } from '../decorators/autobind.js';


  // PROJECTITEM CLASS
 export  class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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

