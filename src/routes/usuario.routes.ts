import { Router } from 'express';
import { register, login } from '../controllers/usuario.controller';

const router = Router();

// Rutas públicas (registro e inicio de sesión)
router.post('/register', register);
router.post('/login', login);

export default router;
