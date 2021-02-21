import { FastifyReply } from "fastify";
import faunadb from "faunadb";
import { MyFaunaError } from "../__errors/MyFaunaHTTPError";

const { Create, Collection } = faunadb.query;

export const createUser = {
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
    if (process.env.FAUNA_SERVER_SECRET === undefined) {
      console.error(`required env variable is not set: FAUNA_SERVER_SECRET`);
      process.exit(1);
    }
    const client = new faunadb.Client({
      secret: process.env.FAUNA_SERVER_SECRET,
    });

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
