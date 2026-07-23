// Joi permite definir esquemas de validación para los datos de entrada
import Joi from 'joi';

// Schema para crear un plato: valida que todos los campos requeridos estén presentes con el formato correcto
export const createPlatoSchema = Joi.object({
  nombre: Joi.string().trim().min(1).max(100).required(),
  descripcion: Joi.string().trim().min(1).max(500).required(),
  precio: Joi.number().min(0.01).required(),
  categoria: Joi.string().valid('entrada', 'principal', 'postre', 'bebida').required(),
  imagenUrl: Joi.string().uri().allow('').optional(),
  disponible: Joi.boolean().optional(),
});

// Schema para actualizar: todos son opcionales pero al menos uno debe enviarse
export const updatePlatoSchema = Joi.object({
  nombre: Joi.string().trim().min(1).max(100).optional(),
  descripcion: Joi.string().trim().min(1).max(500).optional(),
  precio: Joi.number().min(0.01).optional(),
  categoria: Joi.string().valid('entrada', 'principal', 'postre', 'bebida').optional(),
  imagenUrl: Joi.string().uri().allow('').optional(),
  disponible: Joi.boolean().optional(),
}).min(1);
