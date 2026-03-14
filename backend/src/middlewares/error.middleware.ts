import type { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, any>;
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    let error: CustomError = { ...err };

    error.message = err.message;

    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = 'Resource not found';
      error = new Error(message) as CustomError;
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = 'profile already created with the email please login';
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError' && err.errors) {
      const message = Object.values(err.errors)
        .map((val: any) => val.message)
        .join(', ');

      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      error: error.message || 'Internal Server Error'
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
