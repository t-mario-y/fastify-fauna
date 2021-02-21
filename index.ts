import fastify from "fastify";

const server = fastify({ logger: true });

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is listening at address: ${address}`);
});
