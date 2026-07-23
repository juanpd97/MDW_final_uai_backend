import { Router } from 'express';
// authMiddleware protege las rutas que requieren autenticación (admin)
import authMiddleware from '../middleware/auth.middleware';
import {
  getPublicPlatos,
  getAllPlatos,
  createPlato,
  updatePlato,
  toggleDisponible,
  deletePlato,
} from '../controllers/plato.controller';

const router = Router();

// Rutas públicas (no requieren token)
router.get('/publicos', getPublicPlatos);

// Rutas protegidas (requieren token JWT en el header Authorization: Bearer <token>)
router.get('/', authMiddleware, getAllPlatos);
router.post('/', authMiddleware, createPlato);
router.put('/:id', authMiddleware, updatePlato);
router.patch('/:id/disponibilidad', authMiddleware, toggleDisponible);
router.delete('/:id', authMiddleware, deletePlato);

export default router;
