import { createFaunadbClient } from "@/faunadbClientFactory";
import { CreateUserRequestBody } from "@/types/CreateUserRequestBody";
import { MyFaunaError } from "@/__errors/MyFaunaHTTPError";
import CreateUserRequestBodySchema from "@schemas/CreateUserRequestBody.json";
import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from "fastify-autoroutes";
import { Collection, Create } from "faunadb";

export default (): Resource =>
  <Resource>{
    post: {
      schema: {
        body: CreateUserRequestBodySchema,
      },
      handler: async (
        request: FastifyRequest<{ Body: CreateUserRequestBody }>,
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
