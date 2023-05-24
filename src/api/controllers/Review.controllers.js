const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Review = require("../models/Review.models");
const Event = require("../models/Event.models");
const User = require("../models/User.models");
const validator = require("validator");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcript = require("bcrypt");

//------------------------------ CREATE REVIEW ------------------------------
//--------------------------------------------------------------------------
const createReview = async (req, res, next) => {
  try {
    const { email, events, eventId, description, userId, points } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("No existe el usuario");
    }else {

    const newReview = new Review({
      event: eventId,
      description: description,
      user: userId,
      points: points,
    });

    const savedReview = await newReview.save();

    if (savedReview) {
      const event = await Event.findById(eventId);
      if (!event) {
      return res.status(404).json("El evento no existe");
      }

      await User.findByIdAndUpdate(user._id, {
        $push: { review: savedReview._id },
      });

      await Event.findByIdAndUpdate(eventId, {
        $push: { review: savedReview._id },
      });
      return res.status(200).json(savedReview);
    } else {
      return res.status(404).json("No se ha creado correctamente la reseña");
    }
  }
  } catch (error) {
    return next(error);
  }
};

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
    const { name } = req.params;
    const ReviewByName = await Review.find({ name });
    if (ReviewByName) {
      return res.status(200).json(ReviewByName);
    } else {
      return res.status(404).json("Not found Review by name");
    }
  } catch (error) {
    return next(error);
  }
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

module.exports = { createReview, deleteEvent, getAll, getById, getByName };
