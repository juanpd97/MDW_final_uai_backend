import { Router } from 'express';
import {
  getPublicPlatos,
  getAllPlatos,
  createPlato,
  updatePlato,
  toggleDisponible,
  deletePlato,
} from '../controllers/plato.controller';

const router = Router();

router.get('/publicos', getPublicPlatos);
router.get('/', getAllPlatos);
router.post('/', createPlato);
router.put('/:id', updatePlato);
router.patch('/:id/disponibilidad', toggleDisponible);
router.delete('/:id', deletePlato);

export default router;
