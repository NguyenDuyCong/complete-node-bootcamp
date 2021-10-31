/**
 * Event Loop in Node.js
 * - hieu co ban ve event loop: https://viblo.asia/p/event-loop-trong-nodejs-naQZRL1A5vx
 * 
 */

const fs = require('fs');

setTimeout(() => {
  console.log("Timer 1 finished")
}, 0);

setImmediate(() => console.log("Immediate 1 finished"));
// expect: 
// Timer 1 finished
// Immediate 1 finished

fs.readFile('test-file.txt', () => {
  console.log("I/O finished");
  console.log("-----------");

  setTimeout(()=> console.log("Timer 2 finished"));
  setTimeout(()=> console.log("Timer 3 finished"), 3000);
  setImmediate(()=> console.log("Immediate 2 finished"));

  process.nextTick(()=> console.log("Process.nextTick"));
});
// expect:
// I/O finished
// -------------
// Process.nextTick
// Immediate 2 finished
// Timer 2 finished
// Timer 3 finished

console.log("Hello frow the top-level code"); // show first all timer and immediate
