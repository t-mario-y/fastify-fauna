import { createFaunadbClient } from "@/faunadbClientFactory";
import { MyFaunaError } from "@/__errors/MyFaunaHTTPError";
import CreateUserRequestBody from "@schemas/CreateUserRequestBody.json";
import { CreateUserRequestBody as CreateUserRequestBodyInterface } from "types/CreateUserRequestBody";
import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from "fastify-autoroutes";
import { Collection, Create } from "faunadb";

export default (): Resource =>
  <Resource>{
    post: {
      schema: {
        body: CreateUserRequestBody,
      },
      handler: async (
        request: FastifyRequest<{ Body: CreateUserRequestBodyInterface }>,
        reply: FastifyReply
      ): Promise<void> => {
        const client = createFaunadbClient();
        const { username, password } = request.body;
        try {
          const result = await client.query(
            Create(Collection("Users"), {
              data: { username },
              credentials: { password },
            })
          );

          reply.send(result);
        } catch (error) {
          throw new MyFaunaError(error);
        }
      },
    },
  };
