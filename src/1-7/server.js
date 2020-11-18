const http = require("http");

const router = require("./router");

const port = 3000;

const message = `Let's go baby`;

const server = http.createServer(router);
server.listen(port, () => {
  console.log(`server is listening on http://localhost:3000/`);
});
