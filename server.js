http = require('http');
const fs = require('fs');
//create  server
const PORT = process.env.PORT || 8080;
const server = http.createServer((request, response) => {
  const {headers,method,url} = request;


  // console.log('public: ', public);
  console.log('method:', request.method);
  console.log('version:', request.httpVersion);
  console.log('url:', url);
  // console.log('body: ', body);
  // console.log('responseBody: ', responseBody);

  switch (method) {

    case "GET":
    if (url === "/") {
      getIndex(request, response);
    }
    else if (url) {
      getUrl(request, response, url);
    }
    
    break;
    default:
    response.writeHead(404, 'Not Found');
    response.end();
  }

  

});
server.listen(PORT, () => {
    console.log(`Server listening port: ${PORT}`);
  });
function getIndex (request, response) {
  fs.readFile("./public/index.html", function (err, data) {
    if (err) {
      throw err;
    }
    else {
      response.writeHead(200, "OK");
      response.write(data);
      response.end();
    }
  });
}

function getUrl (request, response, url) {
  fs.readFile('./public' + url, function(err, data){
    if (err){
      throw err;
    }
    else {
      response.writeHead(200, "OK");
      response.write(data);
      response.end();
    }
  });
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