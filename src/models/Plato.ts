import { Schema, model, InferSchemaType } from "mongoose";

const platoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0.01,
    },
    categoria: {
      type: String,
      required: true,
      enum: ['entrada', 'principal', 'postre', 'bebida'],
    },
    imagenUrl: {
      type: String,
      default: '',
    },
    disponible: {
      type: Boolean,
      default: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export type IPlato = InferSchemaType<typeof platoSchema>;

export default model('Plato', platoSchema);
