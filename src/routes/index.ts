import { Router } from 'express';
import usuarioRouter from './usuario.routes';
import platoRouter from './plato.routes';

const router = Router();

router.use('/usuario', usuarioRouter);
router.use('/plato', platoRouter);

export default router;
