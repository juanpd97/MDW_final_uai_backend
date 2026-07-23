import { Request, Response, NextFunction } from 'express';

// Middleware centralizado para manejar errores
// Se ejecuta cuando un controlador llama a next(error) o cuando asyncHandler captura un error
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Error interno del servidor' });
};

export default errorHandler;
