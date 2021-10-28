const fs = require('fs');

// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);

// const textOut = `Duplicate text: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!')

// TODO: asynchronous or non-blocking code execution
fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
  console.log(data);
});

console.log("Reading file...");