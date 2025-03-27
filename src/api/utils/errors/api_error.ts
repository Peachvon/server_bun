import httpStatus from "http-status";

class APIError extends Error {
  status: number;
  message: string;
  constructor({ message, status }: APIError) {
    super(message);
    this.message = message;
    this.status = status || httpStatus.INTERNAL_SERVER_ERROR;
  }
}

export default APIError;
