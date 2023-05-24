const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: { type: String, required: false, unique: true },
    gender: {
      type: String,
      enum: ["hombre", "mujer"],
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Email not valid"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword],
      minlength: [8, "min 8 caracteres"],
    },
    imagen: { type: String },
    confirmationCode: { type: String, required: true },
    check: { type: Boolean, default: false },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(error);
    next("Error hashing password", error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
