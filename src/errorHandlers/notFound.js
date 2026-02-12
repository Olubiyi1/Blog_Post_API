import AppError from "./appError.js";

export const notFoundHandler = (req, res, next) => {
  const err = new AppError(`Cannot find route : ${req.originalUrl}`, 404);
  next(err);
};