export const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err);

  return res
    .status(400) // Bad request
    .json(err);
};
