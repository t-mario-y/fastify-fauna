import { FastifyReply, RouteOptions } from "fastify";
import faunadb from "faunadb";
import { createFaunadbClient } from "../faunadbClientFactory";
import { MyFaunaError } from "../__errors/MyFaunaHTTPError";

const { Create, Collection } = faunadb.query;

export const createUser: RouteOptions = {
  method: "POST",
  url: "/users",
  schema: {
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string" },
        password: {
          type: "string",
          minLength: 10,
        },
      },
    },
  },

  //TODO: delete any
  async handler(request: any, reply: FastifyReply): Promise<void> {
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
