


http = require('http');
const fs = require('fs');
//create  server
const PORT = process.env.PORT || 8080;
const server = http.createServer((request, response) => {
  let method = request.method;
  let url = request.url;


  
  console.log('method:', request.method);
  console.log('version:', request.httpVersion);
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
    if (url){
      postData(request,response);
    }
    default:
    err404 (request, response)
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
      response.write(data);
      response.end();
    }
  });
}




// test functions

function postData(request,response) {
  

  let body = '';
  request.on('data', function (data) {
      body += data;
      console.log("body: " + body);
  });
  request.on('end', function () {
      console.log("Body: " + body);
  });
  response.writeHead(200, "OK");
  response.end();
}

// function err405 (request, response) {
//   response.writeHead(405, "Method Not Supported");
//         response.write("<html><body>405: Method not supported. Go to <a href='/index.html'>homepage</a></body></html>");
//         response.end();
// }




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