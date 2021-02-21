import faunadb from "faunadb";
import { FaunaQueryResult } from "../types/FaunaQueryResult";
import { FaunaError } from "../__errors/FaunaError";

const { Login, Match, Index } = faunadb.query;

export const login = {
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

  async handler(request: any, reply: any): Promise<any> {
    const { username, password } = request.body;

    if (process.env.FAUNA_SERVER_SECRET === undefined) {
      console.error(`required env variable is not set: FAUNA_SERVER_SECRET`);
      process.exit(1);
    }
    const client = new faunadb.Client({
      secret: process.env.FAUNA_SERVER_SECRET,
    });

    try {
      const result = (await client.query(
        Login(Match(Index("Users_by_username"), username), { password })
      )) as FaunaQueryResult;
      reply.send({
        secret: result.secret,
      });
    } catch (error) {
      throw new FaunaError(error);
    }
  },
};
