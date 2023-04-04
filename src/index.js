const http = require("http");
const app = require("./app");
const { PORT } = require("./config/env");

// instantiate the server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
 