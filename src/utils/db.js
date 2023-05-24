const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    const dataBase = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { name, host } = dataBase.connection;
    console.log(name, host);
    console.log(`Conectada la DB 👌  en el host: ${host} con el nombre: ${name}`);
  } catch (error) {
    console.log(error);
    console.log("No se ha conectado la db❌");
  }
};

module.exports = { connect };
