export class ResponseError extends Error {
    constructor(public status: number, public message: string) {
      super(message);
      Error.captureStackTrace(this, ResponseError);
    }
  }