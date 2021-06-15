
namespace App {
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
  


  export class ProjectState extends State<Project> {
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
  export const projectState = ProjectState.getInstance();

}