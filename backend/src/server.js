const http = require("http");
const socketIO = require("socket.io");
const Routes = require('./routes')

const port = 3000;

const handler = (request, response) => {
  const defaultRoute = async (request, response) => response.end("hello");
  const routes = new Routes(io)
  const chosen = routes[request.method.toLowerCase()] || defaultRoute


  return chosen.apply(routes,[request, response]);
};

const server = http.createServer(handler);
const io = socketIO(server, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", (socket) => console.log("someone connected", socket.id));

// const interval = setInterval(() => {
//   io.emit("file-uploaded", 5e6);
// }, 250);

io.emit("file-uploaded");

const startServer = () => {
  const { address, port } = server.address();
  console.log(`server started at http://${address}:${port}`);
};

server.listen(port, startServer);
