import fastify from "fastify";
import { createUser } from "./routes/createUser";
import { login } from "./routes/login";

const server = fastify({ logger: true });

server.route({
  method: "POST",
  url: "/users",
  schema: createUser.schema,
  handler: createUser.handler,
});

server.route({
  method: "POST",
  url: "/login",
  schema: login.schema,
  handler: login.handler,
});

server.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is listening at address: ${address}`);
});
