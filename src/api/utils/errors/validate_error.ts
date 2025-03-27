// import httpStatus from "http-status";
// import { ValidationError as JoiError } from "joi";

// export interface IValidationsErrors {
//   params?: JoiError[];
//   headers?: JoiError[];
//   query?: JoiError[];
//   cookies?: JoiError[];
//   signedCookies?: JoiError[];
//   body?: JoiError[];
// }

// /**
//  * @extends Error
//  */
// class ValidateError extends Error {
//   message: string;
//   errors: IValidationsErrors;
//   status: number;
//   constructor({ message, status, errors }: ValidateError) {
//     super(message);
//     this.message = message;
//     this.status = status || httpStatus.BAD_REQUEST;
//     this.errors = errors;
//   }
// }

// export default ValidateError;
