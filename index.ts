import fastify from "fastify";
import { createUser } from "./routes/createUser";
import { login } from "./routes/login";

const server = fastify({ logger: true });

server.route(createUser);

server.route(login);

server.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is listening at address: ${address}`);
});
