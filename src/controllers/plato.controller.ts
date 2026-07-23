// Importa los tipos Request y Response de Express para tipar los parámetros
import { Request, Response } from 'express';
// Importa el modelo Plato para interactuar con la colección en MongoDB
import Plato from '../models/Plato';

// Obtiene solo los platos disponibles (para clientes)
export const getPublicPlatos = async (_req: Request, res: Response) => {
  try {
    const platos = await Plato.find({ disponible: true });
    res.status(200).json(platos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los platos públicos', error });
  }
};

// Obtiene todos los platos (para admin)
export const getAllPlatos = async (_req: Request, res: Response) => {
  try {
    const platos = await Plato.find();
    res.status(200).json(platos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener todos los platos', error });
  }
};

// Crea un nuevo plato con los datos enviados en el body
export const createPlato = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio, categoria, imagenUrl, disponible } = req.body;
    const newPlato = new Plato({ nombre, descripcion, precio, categoria, imagenUrl, disponible });
    await newPlato.save();
    res.status(201).json(newPlato);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el plato', error });
  }
};

// Actualiza un plato por su id con los datos enviados en el body
export const updatePlato = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPlato = await Plato.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPlato) {
      res.status(404).json({ message: 'Plato no encontrado' });
      return;
    }
    res.status(200).json(updatedPlato);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el plato', error });
  }
};

// Alterna el valor de disponible (true/false) de un plato
export const toggleDisponible = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plato = await Plato.findById(id);
    if (!plato) {
      res.status(404).json({ message: 'Plato no encontrado' });
      return;
    }
    plato.disponible = !plato.disponible;
    await plato.save();
    res.status(200).json(plato);
  } catch (error) {
    res.status(500).json({ message: 'Error al cambiar la disponibilidad del plato', error });
  }
};

// Elimina un plato definitivamente por su id
export const deletePlato = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPlato = await Plato.findByIdAndDelete(id);
    if (!deletedPlato) {
      res.status(404).json({ message: 'Plato no encontrado' });
      return;
    }
    res.status(200).json({ message: 'Plato eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el plato', error });
  }
};
