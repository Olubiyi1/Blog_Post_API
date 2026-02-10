class AppError extends Error {
  constructor(message, statusCode) {
    super(message);             // sets the error message
    this.statusCode = statusCode || 500;  // default to 500
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // client vs server
  }
}

export default AppError;
