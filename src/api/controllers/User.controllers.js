const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Review = require("../models/Review.models");
const Event = require("../models/Event.models");
const User = require("../models/User.models");
const validator = require("validator");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcript = require("bcrypt");
const randomCode = require("../../utils/randomCode");
const randomPassword = require("../../utils/randomPass");
const { generateToken, verifyToken } = require("../../utils/token");

const PORT = process.env.PORT;
const ROUTE = process.env.ROUTE;

dotenv.config();

//------------------------------ REGISTER ------------------------------
//----------------------------------------------------------------------

const register = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ FORGOT PASS --------------------------
//---------------------------------------------------------------------

const forgotPassword = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ CHANGE PASS ----------------------------------
//-----------------------------------------------------------------------------

const changePassword = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ UPDATE ------------------------------
//--------------------------------------------------------------------

const updateUser = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ DELETE ------------------------------
//--------------------------------------------------------------------

const deleteUser = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ LOGIN ------------------------------
//-------------------------------------------------------------------

const login = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ LOGOUT ------------------------------
//--------------------------------------------------------------------

const logout = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ CREATE EVENT ------------------------------
//--------------------------------------------------------------------------

const createEvent = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ ADD TO EVENT ------------------------------
//--------------------------------------------------------------------------

const addToEvent = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ GETALL ------------------------------
//--------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ GETBYID ------------------------------
//---------------------------------------------------------------------

const getById = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ GETBYNAME ------------------------------
//-----------------------------------------------------------------------

const getByName = async (req, res, next) => {
  try {
  } catch (error) {}
};

module.exports = {
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
};
