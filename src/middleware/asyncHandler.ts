import { Request, Response, NextFunction } from 'express';

// Envuelve funciones async para que los errores se pasen automáticamente al errorHandler
// Sin esto, habría que escribir try-catch en cada controlador
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default asyncHandler;
