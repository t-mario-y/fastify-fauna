import { errors } from "faunadb";

export class MyFaunaError extends Error {
  code: string;
  statusCode: number;

  constructor(error: errors.FaunaHTTPError) {
    super();

    const errors = error.requestResult.responseContent.errors;

    this.code = errors[0] === undefined ? "" : errors[0].code;
    this.message = errors[0] === undefined ? "" : errors[0].description;
    this.statusCode = 500;

    if (this.code === "instance not unique") {
      this.statusCode = 409;
    }

    if (this.code === "authentication failed") {
      this.statusCode = 401;
    }

    if (this.code === "unauthorized") {
      this.statusCode = 401;
    }

    if (this.code === "instance not found") {
      this.statusCode = 404;
    }

    if (this.code === "permission denied") {
      this.statusCode = 403;
    }
  }
}
