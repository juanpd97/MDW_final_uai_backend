import { Schema, model, InferSchemaType } from "mongoose";

const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
  },
  { timestamps: true }
);

export type IUsuario = InferSchemaType<typeof usuarioSchema>;

export default model('Usuario', usuarioSchema);
