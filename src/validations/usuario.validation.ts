// Joi permite definir esquemas de validación para los datos de entrada
import Joi from 'joi';

// Schema para registrar un usuario: email válido y password con mínimo 6 caracteres
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'El correo es obligatorio',
    'string.email': 'El correo no es válido',
    'any.required': 'El correo es obligatorio',
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'string.max': 'La contraseña no puede superar los 100 caracteres',
    'any.required': 'La contraseña es obligatoria',
  }),
});

// Schema para iniciar sesión: email y password obligatorios
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'El correo es obligatorio',
    'string.email': 'El correo no es válido',
    'any.required': 'El correo es obligatorio',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'any.required': 'La contraseña es obligatoria',
  }),
});
