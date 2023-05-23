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

const express = require("express");

const userRoutes = express.Router();

userRoutes.post = ("/register", register);

module.exports = userRoutes;
