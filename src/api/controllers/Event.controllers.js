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

module.exports = create;
