const { configCloudinary } = require("./src/middleware/files.middleware");
const { connect } = require("./src/utils/db");
const express = require("express");
const dotenv = require("dotenv");

const server = express();

dotenv.config();
configCloudinary();
const ROUTE = process.env.ROUTE;
const PORT = process.env.PORT;
connect();

//limitamos el envio de datos a 5mb y hacemos el urlencoded
server.use(express.json({ limit: "5mb" }));
server.use(express.urlencoded({ limit: "5mb", extended: true }));

/*
                        ROUTES

*/
const eventRoutes = require("./src/api/routes/Event.routes");
server.use("/api/v1/event/", eventRoutes);

//controlamos los errores cuando no se meta bien la ruta o haya algun fallo
server.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});
server.use((error, req, res) => {
  return res.status(error.status || 500).json(error.message || "Unexpected error");
});

server.disable("x-powered-by");
server.listen(PORT, () => {
  console.log(`Listening on PORT ${ROUTE}${PORT}`); //Metemos la URL de forma dinámica por si en un futuro hubieran cambios de dirección
});

