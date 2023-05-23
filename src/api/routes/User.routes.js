const { upload } = require("../../middleware/files.middleware");
const {
  register,
  getAll,
  getById,
  getByName,
  forgotPassword,
  changePassword,
  login,
  logout,
  updateUser,
  deleteUser,
  createEvent,
  addToEvent,
} = require("../controllers/User.controllers");

const express = require("express").Router();

const userRoutes = express;

userRoutes.post("/register", upload.single("imagen"), register);
userRoutes.post("/login", login);
userRoutes.get("/forgotPassword", forgotPassword);
userRoutes.post("/changePassword", changePassword);
<<<<<<< HEAD
userRoutes.delete("/deleteUser", deleteUser);
=======
userRoutes.get("/name/:name", getByName);
userRoutes.get("/", getAll);
userRoutes.get("/:id", getById);
>>>>>>> 9edccbc963a20449b451573400ee7b314cfabafd

module.exports = userRoutes;
