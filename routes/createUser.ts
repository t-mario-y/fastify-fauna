import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import faunadb from "faunadb";
import { createFaunadbClient } from "../faunadbClientFactory";
import { MyFaunaError } from "../__errors/MyFaunaHTTPError";
import createUserRequestBody from "../schemas/createUserRequestBody.json";
const { Create, Collection } = faunadb.query;

export const createUser: RouteOptions = {
  method: "POST",
  url: "/users",
  schema: {
    body: createUserRequestBody,
  },

  //TODO: delete any
  async handler(
    request: FastifyRequest<any>,
    reply: FastifyReply
  ): Promise<void> {
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
};
