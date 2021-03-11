import { createFaunadbClient } from "@/faunadbClientFactory";
import { LoginRequestBody } from "@/types/LoginRequestBody";
import LoginRequestBodySchema from "@schemas/LoginRequestBody.json";
import { MyFaunaError } from "@__errors/MyFaunaHTTPError";
import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from "fastify-autoroutes";
import faunadb from "faunadb";
import { FaunaQueryResult } from "types/FaunaQueryResult";

const { Login, Match, Index } = faunadb.query;

export default (): Resource =>
  <Resource>{
    post: {
      schema: {
        body: LoginRequestBodySchema,
      },
      handler: async (
        request: FastifyRequest<{ Body: LoginRequestBody }>,
        reply: FastifyReply
      ): Promise<void> => {
        const client = createFaunadbClient();

        const { username, password } = request.body;
        try {
          const result = (await client.query(
            Login(Match(Index("Users_by_username"), username), { password })
          )) as FaunaQueryResult;
          reply.send({ secret: result.secret });
        } catch (error) {
          throw new MyFaunaError(error);
        }
      },
    },
  };
