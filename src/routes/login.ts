import { FastifyReply, RouteOptions } from "fastify";
import faunadb from "faunadb";
import { createFaunadbClient } from "@/faunadbClientFactory";
import { FaunaQueryResult } from "types/FaunaQueryResult";
import { MyFaunaError } from "@__errors/MyFaunaHTTPError";

const { Login, Match, Index } = faunadb.query;

export const login: RouteOptions = {
  method: "POST",
  url: "/login",
  schema: {
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
    },
  },

  async handler(request: any, reply: FastifyReply): Promise<void> {
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
};
