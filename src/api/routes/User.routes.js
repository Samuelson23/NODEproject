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
userRoutes.delete("/deleteUser", deleteUser);

module.exports = userRoutes;
