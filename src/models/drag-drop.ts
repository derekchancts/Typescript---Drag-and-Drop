
// DRAG AND DROP INTERFACES
namespace App {

  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  };

  export interface DragTarget {
    // inform the browser that the item is a valid drag target. Emit the drag
    dragOverHandler(event: DragEvent): void; 

    // hanlde the drag
    dropHandler(event: DragEvent): void;  

    // update the user (with visual effects for example)
    dragLeaveHandler(event: DragEvent): void;  
  };

};