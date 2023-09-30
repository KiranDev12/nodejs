//* require func is used to manage the dependencies in your program
//! CommonJs
// const http = require('http'); 
//features web server creation

//!ECMA Script 
import http from 'http';
//while execution follow it with .mjs extension in file

//the code below will only create a server and not activate it
const server = http.createServer((req, res) => {
  res.end('Hello node ...\n');
});

//to activate a server you need to listen 
// OS port, func that will run once server is active
server.listen(4242, () => {
  console.log('Server is running...');
});
