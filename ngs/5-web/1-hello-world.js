const http = require("http");

// request , response
const requestListener = (req, res) => {
  // console.log(req.url);
  console.dir(res, {depth: 0});
  res.write("Hello node!\n");
  res.end(); //! this is must as the http session need to end
};

// const server = http.createServer(requestListener);

const server = http.createServer();
server.on("request", requestListener);

server.listen(4242, () => {
  console.log("Server is running...");
});
