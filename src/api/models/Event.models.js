const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema (
{
    name: { type: String, required: true },
    location: { type: String, required: true },
    data: { type: date, required: true },
    hour: { type: String, required: true},
description: { type: String, required: true},
user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
preview: { type: mongoose.Schema.Types.ObjectId, ref: "Preview" }
},
{
    timestamps: true,
}

);
const Event = mongoose.model("Event", EventSchema);
module.exports = Event;

