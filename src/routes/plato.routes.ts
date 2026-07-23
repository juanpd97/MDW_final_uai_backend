import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
// validate ejecuta la validación con Joi antes de llegar al controlador
import validate from '../middleware/validate';
import { createPlatoSchema, updatePlatoSchema } from '../validations/plato.validation';
import {
  getPublicPlatos,
  getAllPlatos,
  createPlato,
  updatePlato,
  toggleDisponible,
  deletePlato,
} from '../controllers/plato.controller';

const router = Router();

// Rutas públicas
router.get('/publicos', getPublicPlatos);

// Rutas protegidas (requieren token JWT)
router.get('/', authMiddleware, getAllPlatos);
router.post('/', authMiddleware, validate(createPlatoSchema), createPlato);
router.put('/:id', authMiddleware, validate(updatePlatoSchema), updatePlato);
router.patch('/:id/disponibilidad', authMiddleware, toggleDisponible);
router.delete('/:id', authMiddleware, deletePlato);

export default router;
