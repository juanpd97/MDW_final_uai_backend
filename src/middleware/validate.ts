import { Request, Response, NextFunction } from 'express';
// Joi permite definir y ejecutar validaciones sobre objetos
import Joi from 'joi';

// Middleware que valida req.body contra un schema de Joi.
// Si falla responde 400 con los detalles, si pasa asigna los valores saneados y continua
const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

    if (error) {
      const messages = error.details.map((d) => d.message);
      res.status(400).json({ message: 'Datos inválidos', errors: messages });
      return;
    }

    // Reemplaza req.body con los datos validados y saneados
    req.body = value;
    next();
  };
};

export default validate;
