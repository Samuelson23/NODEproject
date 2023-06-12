const { isAuth } = require("../../middleware/auth.middleware");
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
  autoLogin,
} = require("../controllers/User.controllers");

const express = require("express").Router();

const userRoutes = express;

userRoutes.post("/register", upload.single("imagen"), register);
userRoutes.post("/login", login);
userRoutes.patch("/forgotPassword", forgotPassword);
userRoutes.post("/changePassword", changePassword);
userRoutes.delete("/deleteUser", deleteUser);
userRoutes.post("/checkCode", checkUser);
userRoutes.post("/resendCode", resendCode);
userRoutes.patch("/updateUser", updateUser);
userRoutes.get("/name/:name", getByName);
userRoutes.get("/", getAll);
userRoutes.get("/:id", getById);
userRoutes.post("/changeEmail", changeEmail);
userRoutes.post("/login/autologin", autoLogin);

userRoutes.post("/addtoEvent", [isAuth], addToEvent);

module.exports = userRoutes;
