export const notFound = (message: string, code?: string) => {
  const jsonError = {
    code: code ? code : "database",
    message: message ? message : "not found",
  };
  return jsonError;
};

export const errAuth = (message: string) => {
  const jsonError = {
    code: "authorization",
    message: message ? message : "error authorization",
  };
  return jsonError;
};
