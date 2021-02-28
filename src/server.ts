import fastify from "fastify";
import AutoRoutes from "fastify-autoroutes";

const server = fastify({ logger: true });

server.register(AutoRoutes, {
  dir: "./routes",
});

server.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is listening at address: ${address}`);
});
