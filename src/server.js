require('env2')('.env');
const http = require('http');

const port = process.env.PORT || 3000;
const router = require('./router');

const server = http.createServer(router);

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://localhost:${port}`);
});
