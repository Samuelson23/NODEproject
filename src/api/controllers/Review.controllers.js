const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Review = require("../models/Review.models");
const Event = require("../models/Event.models");
const User = require("../models/User.models");
const validator = require("validator");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcript = require("bcrypt");

//------------------------------ DELETE ------------------------------
//----------------------------------------------------------------------

const deleteReview = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ GETBYALL ------------------------------
//----------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ GETBYNAME ------------------------------
//----------------------------------------------------------------------

const getByName = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ GETBYID ------------------------------
//----------------------------------------------------------------------

const getById = async (req, res, next) => {
  try {
  } catch (error) {}
};

module.exports = { deleteEvent, getAll, getById, getByName };
