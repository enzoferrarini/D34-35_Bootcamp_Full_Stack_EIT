import mongoose from "mongoose";
import colors from "colors";

export const dbConection = async () => {
  try {
    const mongoDB = await mongoose.connect(process.env.DB_URL_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      colors.green("Conexión exitosa a Base de Datos mongoDB: "),
      colors.rainbow(mongoDB.connection.name)
    );
  } catch (error) {
    console.error("Error al intentar conectar la Base de Datos mongoDB");
    throw new Error(error);
  }
};
