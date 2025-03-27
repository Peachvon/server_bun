// import httpStatus from "http-status";
// import { ValidationError } from "express-validation";
// import APIError from "@utils/errors/apiError";
// import ValidateError, {
//   IValidationsErrors,
// } from "@utils/errors/validate_error";

// interface IResponseError {
//   status: number;
//   message: string;
//   errors?: IValidationsErrors;
// }

// export const handler = (error, req, res) => {
//   const response: IResponseError = {
//     status: error.status,
//     message: error.message || httpStatus[error.status],
//     errors: error.errors ? error.errors : [],
//   };

//   res.status(error.status);
//   res.json(response);
// };

// /**
//  * If error is not an instanceOf APIError, convert it.
//  * @public
//  */
// export const converter = (error, req, res, next) => {
//   let convertedError = error;
//   if (error instanceof ValidationError) {
//     convertedError = new ValidateError({
//       status: error.statusCode,
//       message: "validation error",
//       errors: error.details,
//     });
//   } else if (!(error instanceof APIError)) {
//     convertedError = new APIError({
//       status: error.status,
//       message: error.message,
//     });
//   } else {
//     next(error);
//   }

//   return handler(convertedError, req, res);
// };

// // /**
// //  * Catch 404 and forward to error handler
// //  * @public
// //  */
// export const notFound = (req, res) => {
//   const error = new APIError({
//     message: "Not found",
//     status: httpStatus.NOT_FOUND,
//   });
//   return handler(error, req, res);
// };
