import { Router } from 'express';
// validate ejecuta la validación con Joi antes de llegar al controlador
import validate from '../middleware/validate';
import { registerSchema, loginSchema } from '../validations/usuario.validation';
import { register, login } from '../controllers/usuario.controller';

const router = Router();

// Rutas públicas (registro e inicio de sesión)
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
