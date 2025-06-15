import type { ValidateFunction } from 'ajv';
import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils';

// biome-ignore lint:
export const inputBodyValidation = (validator: ValidateFunction<any>) => {
  return (req: Request, _res: Response, _next: NextFunction) => {
    const valid = validator({ ...req.body });

    if (!valid) throw new AppError(validator.errors, 400);
    _next();
  };
};

// biome-ignore lint:
export const inputFilterValidation = (validator: ValidateFunction<any>) => {
  return (req: Request, _res: Response, _next: NextFunction) => {
    const valid = validator({ ...req.params, ...req.query });
    if (!valid) throw new AppError(validator.errors, 400);
    _next();
  };
};
