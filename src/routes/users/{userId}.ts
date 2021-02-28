import { FastifyReply, FastifyRequest } from "fastify";
import GetUserRequestParams from "@schemas/GetUserRequestParams.json";
import { GetUserRequestParams as GetUserRequestParamsInterface } from "types/GetUserRequestParams";
import { createFaunadbClient } from "@/faunadbClientFactory";
import { Resource } from "fastify-autoroutes";
import { MyFaunaError } from "@/__errors/MyFaunaHTTPError";
import { Collection, Delete, Get, Ref } from "faunadb";

export default (): Resource =>
  <Resource>{
    get: {
      config: {
        isPrivate: true,
      },
      schema: {
        params: GetUserRequestParams,
      },
      handler: async (
        request: FastifyRequest<{ Params: GetUserRequestParamsInterface }>,
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
      config: {
        isPrivate: true,
      },
      handler: async (
        request: FastifyRequest<{ Params: GetUserRequestParamsInterface }>,
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
