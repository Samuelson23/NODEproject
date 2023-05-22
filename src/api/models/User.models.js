const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    email: { type: String, required: true, unique: true, validate:[validator.isEmail, 'Email not valid'] },
    password: { type: String, required: true, trim: true, validate:[validator.isStrongPassword] },
    imagen: { type: String },
    confirmationCode: { type: String, required: true },
    check: { type: Boolean, default: false },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }]
});

UserSchema.pre('save', async function (next) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next('Error hashing password', error);
    }
  });

const User = mongoose.model("User", UserSchema);
module.exports = User;
