import express from "express";
import dotenv from "dotenv";
import { dbConection } from "./database/dbConection.js";
import colors from "colors";
import taskRoutes from "./routes/task.routes.js";
import cors from "cors";

const app = express();

const appServer = async () => {
  dotenv.config();
  console.log(colors.bgYellow(process.env.PORT));
  // DB Conection
  await dbConection();

  // Middleware para parsear JSON
  app.use(express.json());
  // Habilitar CORS
  const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };
  app.use(cors(corsOptions));
  // Rutas
  app.use("/api", taskRoutes);

  app.listen(process.env.PORT, () =>
    console.log(colors.yellow(`Server Running in port: ${process.env.PORT}`))
  );
};

appServer();
