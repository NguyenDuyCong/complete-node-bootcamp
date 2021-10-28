const fs = require('fs');
const http = require('http');

////////////////////////////////
// FILES
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);

// const textOut = `Duplicate text: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!')

// // TODO: asynchronous or non-blocking code execution
// fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//   console.log(data);
// });

// console.log("Reading file...");

//////////////////////////////////
// SERVER

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/') {
    res.end("hello from server");
  } else if (pathName === "/api"){
    fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!!!</h1>')
  }
});

server.listen(8000, 'localhost', () => {
  console.log("Listening to request on port 8000");
})

