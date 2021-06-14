
const button = document.querySelector('button')!;
const btn = document.querySelector('.btn')!;

// if (button) {
  button.addEventListener('click', () => console.log("clicked"))
  // btn.addEventListener('click', () => {
  //   console.log('clicked')
  // }) 
// }



function clickHandler(message: string) {
  console.log('pressed ' + message);
}

btn.addEventListener('click', clickHandler.bind(null, "you\'re welcome"));
