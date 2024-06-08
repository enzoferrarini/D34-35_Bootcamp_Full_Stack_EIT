import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    task_name: { type: String, unique: true, required: true },
    task_description: { type: String, required: false },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

// Valida que el TASK NAME sea unico
TaskSchema.path("task_name").validate(async function (value) {
  const count = await this.model("Task").countDocuments({ task_name: value });
  return !count;
}, "El nombre de la Tarea no puede ser repetida");

export const Task = model("Task", TaskSchema);