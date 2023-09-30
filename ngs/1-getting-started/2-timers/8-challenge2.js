// Print "Hello World"
// Every second
// And stop after 5 times

// After 5 times. Print "Done" and let Node exit.
let cnt = 0
const cntID = setInterval( () => {
    console.log('hello world');
    cnt++;
    if (cnt===5) {
        console.log('done');
        clearInterval(cntID);
    }
}, 1000);