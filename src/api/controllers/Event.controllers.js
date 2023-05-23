const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Review = require("../models/Review.models");
const Event = require("../models/Event.models");
const User = require("../models/User.models");
const validator = require("validator");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcript = require("bcrypt");

//------------------------------ CREATE ------------------------------
//----------------------------------------------------------------------

const createEvent = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ UPDATE ------------------------------
//----------------------------------------------------------------------

const updateEvent = async (req, res, next) => {
  try {
  } catch (error) {}
};

//------------------------------ DELETE ------------------------------
//----------------------------------------------------------------------

const deleteEvent = async (req, res, next) => {
  try {
    const { id, image } = req.params;
    await Event.findByIdAndDelete(id);

    if (await Event.findById(id)) {
      return res.status(404).json("El evento no se ha borrado");
    } else {
      deleteImgCloudinary(image);
      return res.status(200).json("Evento borrado");
    }
  } catch (error) {
    return next(error);
  }
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

module.exports = { createEvent, updateEvent, deleteEvent, getAll, getById, getByName };
