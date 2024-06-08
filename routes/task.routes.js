import express from "express";
import {
  createTask,
  getTasks,
  getTaskId,
  editTaskId,
  deleteTaskId,
} from "../controller/taskController.js";

const route = express.Router();
route.get("/", getTasks);
route.post("/", createTask);
route.get("/:id", getTaskId);
route.put("/:id", editTaskId);
route.delete("/:id", deleteTaskId);

export default route;
