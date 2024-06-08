import { Task } from "../models/Task.js";
import colors from "colors";

export const createTask = async (req, res) => {
  const { body } = req;

  try {
    const newTask = await Task.create(body);
    res.json({
      ok: true,
      newTask,
      msg: "Nueva tarea creada exitosamente",
    });
  } catch (error) {
    if (error.name === "ValidationError" && error.errors.task_name) {
      // Si el error es de validación debido a task_name duplicado
      res.status(400).json({ ok: false, msg: error.message });
    } else {
      console.log(colors.red(error));
      res
        .status(500)
        .json({ ok: false, msg: "Ha habido un error en el servidor." });
    }
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      deletedAt: { $in: [null, undefined] },
    }).sort({ task_name: 1 });
    res.json({ ok: true, tasks });
  } catch (error) {
    console.log(colors.red(error));
    res
      .status(500)
      .json({ ok: false, msg: "Ha habido un error en el servidor." });
  }
};

export const getTaskId = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({
        ok: false,
        msg: `No se pudo encontrar la Tarea por Id:${id}`,
      });
    }
    res.json({
      ok: true,
      task,
      msg: "La Tarea se econttró exitosamente.",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error con el servidor",
    });
  }
};

export const editTaskId = async (req, res) => {
  try {
    const { id } = req.params;

    const foundTask = await Task.findOne({
      _id: id,
    });
    if (!foundTask) {
      return res.status(404).json({
        ok: false,
        msg: "No se ha encontrado la Tarea que desea editar",
      });
    }

    const newTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
      ok: true,
      user: newTask,
      msg: "La tarea se editó exitosamente",
    });
  } catch (error) {
    console.log(colors.red(error));
    res
      .status(500)
      .json({ ok: false, msg: "Ha habido un error en el servidor." });
  }
};

export const deleteTaskId = async (req, res) => {
  const { id } = req.params;

  try {
    const foundTask = await Task.findOne({
      _id: id,
      deletedAt: { $in: [null, undefined] },
    });

    if (!foundTask) {
      return res.status(404).json({
        ok: false,
        msg: "No se ha encontrado la tarea a eliminar",
      });
    }

    await Task.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });

    res.json({
      ok: true,
      msg: "La Tarea se elimino correctamente",
    });
  } catch (error) {
    console.log(colors.red(error));
    res
      .status(500)
      .json({ ok: false, msg: "Ha habido un error en el servidor." });
  }
};
