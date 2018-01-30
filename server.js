
http = require('http');
const fs = require('fs');
const querystring = require('querystring');
//create  server
const PORT = process.env.PORT || 8080;
const server = http.createServer((request, response) => {
  let method = request.method;
  let version = request.httpVersion
  let url = request.url;
  let body = [];
  let reqSettings = {method:method, version:version, url:url ,body:body};

  
  console.log('method:', method);
  console.log('version:', version);
  console.log('url:', url);
  
  

  switch (method) {

    case "GET":
    if (url === "/") {
      getIndex(request, response);
    }
    else if (url) {
      getUrl(request, response, url);
    }
    break;
    case "POST":
    postData(request,response);
    
    default:
    err405 (request, response)
    break;
  }

  

});
// server listening to PORT
server.listen(PORT, () => {
    console.log(`Server listening port: ${PORT}`);
  });
  // Returns index in new public file
function getIndex (request, response,) {
  fs.readFile('./public/index.html', function (err, data) {
    if (err) {
       err404(request,response);
    } 
    else {
      response.writeHead(200, "OK");
      response.write(data);
      response.end();
    }
  });
}
// get css/other
function getUrl (request, response, url) {
  fs.readFile('./public' + url, function(err, data){
    if (err){
       err404(request,response);
    }
    else {
      response.writeHead(200, "OK");
      response.write(data);
      response.end();
    }
  });
}
//error 404.html
function err404 (request, response) {
  fs.readFile('./public/404.html', function(err, data){
    if (err){
      throw err;
    }
    else {
      response.writeHead(404, "Error");
      // response.write(data);
      response.end();
    }
  });
}




// test functions

function postData(request,response) {
  let method = request.method;
  let headers = request.method;
  let url = request.url;
  
  
  request.on('data',function(chunk) {
    let chunkString = chunk.toString();
    console.log(chunk.toString());
    let body = querystring.parse(chunkString);
    console.log(body);
 
  fs.writeFile("/public" + `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>The Elements - ${body.name}</title>
    <link rel="stylesheet" href="/css/styles.css">
  </head>
  <body>
    <h1>${body.name}</h1>
    <h2>${body.symbol}</h2>
    <h3>${body.atnum}</h3>
    <p>${body.description}</p>
    <p><a href="/">back</a></p>
  </body>
  </html>`) 
});
  response.writeHead(200, {"Content-type" : "application/json"});
  
  let reqSettings = {method:method, headers:headers, url:url };

response.end(JSON.stringify(reqSettings));

}
  


function err405 (request, response) {
  response.writeHead(405, "Method Not Supported");
        response.write("<html><body>405: Method not supported. Go to <a href='/index.html'>homepage</a></body></html>");
        response.end();
}




// // functions
// function getHandler(url, response) {
//   response.getHeader(`${url}`)
//   response.writeHead(200, {
//     'Content-Length': Buffer.byteLength(body),
//     'Content-Type': 'text/html'
//   });
//   response.write(url)
// };





// //invoke
// getHandler();
// 
//let body =[];
// request.on('error', (err) => {
//   console.error(err);
// }).on('data', (chunk) => {
//   body.push(chunk);
// }).on('end', () => {
//   body = Buffer.concat(body).toString();
// });
// response.writeHead(200, {
//   'Content-Type': 'text/html',
// });
// const responseBody = { headers, method, url, body };
// let public = 
//   response.write(JSON.stringify(responseBody));
//   response.end();
//let posturl = parse.elementalname.tolowercase
//{postUrl}