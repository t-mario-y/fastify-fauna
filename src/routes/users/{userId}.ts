import { createFaunadbClient } from "@/faunadbClientFactory";
import { GetUserRequestParams } from "@/types/GetUserRequestParams";
import { MyFaunaError } from "@/__errors/MyFaunaHTTPError";
import GetUserRequestParamsSchema from "@schemas/GetUserRequestParams.json";
import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from "fastify-autoroutes";
import { Collection, Delete, Get, Ref } from "faunadb";

export default (): Resource =>
  <Resource>{
    get: {
      schema: {
        params: GetUserRequestParamsSchema,
      },
      handler: async (
        request: FastifyRequest<{ Params: GetUserRequestParams }>,
        reply: FastifyReply
      ): Promise<void> => {
        const userId = request.params.userId;
        const client = createFaunadbClient();
        try {
          const result = await client.query(
            Get(Ref(Collection("Users"), userId))
          );
          reply.send(result);
        } catch (error) {
          throw new MyFaunaError(error);
        }
      },
    },
    delete: {
      handler: async (
        request: FastifyRequest<{ Params: GetUserRequestParams }>,
        reply: FastifyReply
      ): Promise<void> => {
        const userId = request.params.userId;
        const client = createFaunadbClient();
        try {
          const result = await client.query(
            Delete(Ref(Collection("Users"), userId))
          );
          reply.send(result);
        } catch (error) {
          throw new MyFaunaError(error);
        }
      },
    },
  };
