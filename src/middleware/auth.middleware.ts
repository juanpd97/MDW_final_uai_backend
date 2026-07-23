import { Request, Response, NextFunction } from 'express';
// jsonwebtoken permite verificar y decodificar tokens JWT
import jwt from 'jsonwebtoken';

// Verifica que el token JWT sea válido antes de acceder a rutas protegidas
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token no proporcionado' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;
