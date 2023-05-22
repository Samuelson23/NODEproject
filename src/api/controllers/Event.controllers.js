const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Review = require("../models/Review.models");
const Event = require("../models/Event.models");
const User = require("../models/User.models");
const validator = require("validator");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcript = require("bcrypt");

//----------------CREATE--------------- hay que modificarlo para que sólo lo pueda crear un usuario admin
const create = async (req, res, next) => {
  console.log(req.body);
  try {
    const newEvent = new Event(req.body);
    const saveEvent = await newEvent.save();
    console.log(saveEvent);
    if (saveEvent) {
      return res.status(200).json(saveEvent);
    } else {
      return res.status(404).json("no se ha podido crear el evento");
    }
  } catch (error) {
    return next(error);
  }
};

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
    const {id} = req.params;
    await Event.findByIdAndDelete(id);
    return res.status(200).json('Character deleted!');

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

module.exports = { create, updateEvent, deleteEvent, getAll, getById, getByName };
