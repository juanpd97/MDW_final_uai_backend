// Joi permite definir esquemas de validación para los datos de entrada
import Joi from 'joi';

// Schema para crear un plato: valida que todos los campos requeridos estén presentes con el formato correcto
export const createPlatoSchema = Joi.object({
  nombre: Joi.string().trim().min(1).max(100).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre es obligatorio',
    'any.required': 'El nombre es obligatorio',
  }),
  descripcion: Joi.string().trim().min(1).max(500).required().messages({
    'string.empty': 'La descripción es obligatoria',
    'string.min': 'La descripción es obligatoria',
    'any.required': 'La descripción es obligatoria',
  }),
  precio: Joi.number().min(0.01).required().messages({
    'number.base': 'El precio debe ser un número',
    'number.min': 'El precio debe ser mayor a 0',
    'any.required': 'El precio es obligatorio',
  }),
  categoria: Joi.string()
    .valid('entrada', 'principal', 'postre', 'bebida')
    .required()
    .messages({
      'string.empty': 'La categoría es obligatoria',
      'any.only': 'Categoría inválida',
      'any.required': 'La categoría es obligatoria',
    }),
  imagenUrl: Joi.string().uri().allow('').optional().messages({
    'string.uri': 'La URL de la imagen no es válida',
  }),
  disponible: Joi.boolean().optional(),
});

// Schema para actualizar: todos son opcionales pero al menos uno debe enviarse
export const updatePlatoSchema = Joi.object({
  nombre: Joi.string().trim().min(1).max(100).optional().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre es obligatorio',
  }),
  descripcion: Joi.string().trim().min(1).max(500).optional().messages({
    'string.empty': 'La descripción es obligatoria',
    'string.min': 'La descripción es obligatoria',
  }),
  precio: Joi.number().min(0.01).optional().messages({
    'number.base': 'El precio debe ser un número',
    'number.min': 'El precio debe ser mayor a 0',
  }),
  categoria: Joi.string()
    .valid('entrada', 'principal', 'postre', 'bebida')
    .optional()
    .messages({
      'any.only': 'Categoría inválida',
    }),
  imagenUrl: Joi.string().uri().allow('').optional().messages({
    'string.uri': 'La URL de la imagen no es válida',
  }),
  disponible: Joi.boolean().optional(),
}).min(1);
