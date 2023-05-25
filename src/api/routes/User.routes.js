const { upload } = require("../../middleware/files.middleware");

const {
  register,
  getAll,
  getById,
  getByName,
  forgotPassword,
  changePassword,
  login,
  updateUser,
  deleteUser,
  addToEvent,
  checkUser,
  resendCode,
  changeEmail,
} = require("../controllers/User.controllers");

const express = require("express").Router();

const userRoutes = express;

userRoutes.post("/register", upload.single("imagen"), register);
userRoutes.post("/login", login);
userRoutes.get("/forgotPassword", forgotPassword);
userRoutes.post("/changePassword", changePassword);
userRoutes.delete("/deleteUser", deleteUser);
userRoutes.post("/checkUser", checkUser);
userRoutes.post("/resendCode", resendCode);
userRoutes.patch("/updateUser/:id", updateUser);
userRoutes.get("/name/:name", getByName);
userRoutes.get("/", getAll);
userRoutes.get("/:id", getById);
userRoutes.post("/changeEmail", changeEmail);

userRoutes.post("/addtoEvent", addToEvent);

module.exports = userRoutes;
