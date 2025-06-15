import type { NextFunction, Response } from 'express';
import { NODE_ENV } from '../constants';
import type { ApplicationError, ReqExtra } from '../types/globalTypes';
import { AppError } from '../utils';

//
const handleCastErrorDB = (err: ApplicationError) => {
  const message = `Invalid ${err.details.path}: ${err.details.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: ApplicationError) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0]; // error message property name message
  const message = `Duplicate field value: ${value} Please use another value.`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: ApplicationError) => {
  const errors = Object.values(err.details.errors).map(
    // biome-ignore lint:
    (el: any, _i) => el.path,
  );

  const message = `There are ${errors.length} Invalid input data in path - [ ${errors} ]`;

  return new AppError(message, 400);
};

const handleJWTError = (_err: ApplicationError) =>
  new AppError('Invalid Token! Please log in again.', 401);

const handleJWTExpError = (_err: ApplicationError) =>
  new AppError('Login session expired please login again.', 401);

const sendErrorDev = (err: ApplicationError, res: Response) => {
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = async (
  err: ApplicationError,
  res: Response,
  _req: ReqExtra,
) => {
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
  });
};

export const errorHandler = (
  err: ApplicationError,

  req: ReqExtra,
  res: Response,
  _next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || false;

  if (NODE_ENV === 'dev') {
    sendErrorDev(err, res);
  } else if (NODE_ENV === 'prod') {
    let error;

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(err);
    if (err.name === 'TokenExpiredError') error = handleJWTExpError(err);

    sendErrorProd(error ? error : err, res, req);
  }
};
