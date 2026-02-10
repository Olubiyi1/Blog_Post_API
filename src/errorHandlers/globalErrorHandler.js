export const globalErrorHandler = (err, req, res, next) => {
  // default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Something went wrong!';

  // response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
