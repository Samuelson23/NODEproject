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
    const { id } = req.params;
    const reviewById = await Review.findById(id).populate("event review");
    if (reviewById) {
      return res.status(200).json(reviewById);
    } else {
      return res.status(404).json("Not found review by id");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { deleteEvent, getAll, getById, getByName };
