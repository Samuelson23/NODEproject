const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    data: { type: Date, required: true },
    hour: { type: String, required: true },
    description: { type: String, required: true },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);
const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
