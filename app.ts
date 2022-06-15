import Server from './models/server';

const server = new Server();
server.listen();
console.log("Running in port 8080");