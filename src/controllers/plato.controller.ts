import { Request, Response } from 'express';
import Plato from '../models/Plato';
// asyncHandler elimina la necesidad de try-catch en cada controlador
import asyncHandler from '../middleware/asyncHandler';

// Obtiene solo los platos disponibles (para clientes)
export const getPublicPlatos = asyncHandler(async (_req: Request, res: Response) => {
  const platos = await Plato.find({ disponible: true });
  res.status(200).json(platos);
});

// Obtiene todos los platos (para admin)
export const getAllPlatos = asyncHandler(async (_req: Request, res: Response) => {
  const platos = await Plato.find();
  res.status(200).json(platos);
});

// Crea un nuevo plato con los datos enviados en el body
export const createPlato = asyncHandler(async (req: Request, res: Response) => {
  const { nombre, descripcion, precio, categoria, imagenUrl, disponible } = req.body;
  const newPlato = await Plato.create({ nombre, descripcion, precio, categoria, imagenUrl, disponible });
  res.status(201).json(newPlato);
});

// Actualiza un plato por su id con los datos enviados en el body
export const updatePlato = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedPlato = await Plato.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedPlato) {
    res.status(404).json({ message: 'Plato no encontrado' });
    return;
  }
  res.status(200).json(updatedPlato);
});

// Alterna el valor de disponible (true/false) de un plato
export const toggleDisponible = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const plato = await Plato.findById(id);
  if (!plato) {
    res.status(404).json({ message: 'Plato no encontrado' });
    return;
  }
  plato.disponible = !plato.disponible;
  await plato.save();
  res.status(200).json(plato);
});

// Elimina un plato definitivamente por su id
export const deletePlato = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedPlato = await Plato.findByIdAndDelete(id);
  if (!deletedPlato) {
    res.status(404).json({ message: 'Plato no encontrado' });
    return;
  }
  res.status(200).json({ message: 'Plato eliminado exitosamente' });
});
