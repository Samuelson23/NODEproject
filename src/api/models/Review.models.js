const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const ReviewSchema = new mongoose.Schema({
  event: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  description: {
    type: String,
    required: true,
  },
  user: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  points: {
    type: Number,
    required: true,
  },
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
