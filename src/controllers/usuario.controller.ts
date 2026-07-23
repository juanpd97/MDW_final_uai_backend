// Importa los tipos Request y Response de Express para tipar los parámetros
import { Request, Response } from 'express';
// bcryptjs permite hashear y comparar contraseñas de forma segura
import bcrypt from 'bcryptjs';
// jwt genera tokens de autenticación para mantener la sesión del usuario
import jwt from 'jsonwebtoken';
// Importa el modelo Usuario para interactuar con la colección en MongoDB
import Usuario from '../models/Usuario';

// Registra un nuevo usuario: hashea la contraseña y devuelve un token
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya existe' });
      return;
    }

    // Genera un hash seguro de la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Usuario.create({ email, password: hashedPassword });

    // Crea un token JWT con el id y email del usuario, válido por 7 días
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' },
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Inicia sesión: verifica credenciales y devuelve un token
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await Usuario.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Compara la contraseña enviada con el hash guardado en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Crea un token JWT con el id y email del usuario, válido por 7 días
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' },
    );

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
