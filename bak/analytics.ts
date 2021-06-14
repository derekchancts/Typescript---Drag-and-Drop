
// Variables - it's ok not to declare the type. Typescript can track the type.
let logged;  

// Parameters - it's not ok for paramters
function sendAnalytics(data: string) {
  console.log(data);
  logged = true;
  // console.log(logged);
}

sendAnalytics('The data');