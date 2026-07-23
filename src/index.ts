import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import connectDB from './db';
// errorHandler captura cualquier error lanzado en los controladores y devuelve una respuesta 500
import errorHandler from './middleware/errorHandler';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api', router);

app.get('/', (_req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Middleware para rutas no encontradas (404)
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware de errores (debe ir al final)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});

export default app;
