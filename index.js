import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';


dotenv.config(); // Cargar variables de entorno desde .env

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilitar CORS para todas las rutas 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});

module.exports = app;
