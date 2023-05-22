const dotenv = require("dotenv");
const express = require("express");
const server = express();
const { connect } = require("./src/utils/db");
const { configCloudinary } = require("./src/middleware/files.middleware");

connect();
configCloudinary();
const PORT = process.env.PORT;

server.use(express.json({ limit: "5mb" }));
server.use(express.urlencoded({ limit: "5mb", extended: true }));

server.use("*", (req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    return next(error);
});

server.listen(PORT, () => {
    console.log(`Listening on PORT http://localhost:${PORT}`);
  });
