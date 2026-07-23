// Joi permite definir esquemas de validación para los datos de entrada
import Joi from 'joi';

// Schema para registrar un usuario: email válido y password con mínimo 6 caracteres
export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

// Schema para iniciar sesión: email y password obligatorios
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
