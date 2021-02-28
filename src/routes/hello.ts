import { Resource } from "fastify-autoroutes";

export default (): Resource =>
  <Resource>{
    get: {
      handler: async (): Promise<string> => {
        return `{"message":"hello!"}`;
      },
    },
  };
