import faunadb, { Client } from "faunadb";

export const createFaunadbClient = (): Client => {
  if (process.env.FAUNA_SERVER_SECRET === undefined) {
    console.error(`required env variable is not set: FAUNA_SERVER_SECRET`);
    process.exit(1);
  }

  return new faunadb.Client({
    secret: process.env.FAUNA_SERVER_SECRET,
  });
};
