const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

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

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true);
  
  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    
    res.writeHead(200, {'Content-type': 'text/html'});

    // console.log(dataObj);
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    // console.log(cardsHtml);
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

  // Product page 
  } else if (pathname === "/product"){
    
    res.writeHead(200, {'Content-type': 'text/html'});
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

  // api
  } else if (pathname == '/api') {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(data);

  // 404 page
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!!!</h1>')
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log("Listening to request on port 8000");
})

