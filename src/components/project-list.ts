
namespace App {
   // PROJECTLIST CLASS
  
   export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget { 
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

}