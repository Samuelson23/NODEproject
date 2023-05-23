const {
  createEvent,
  updateEvent,
  deleteEvent,
  getAll,
  getById,
  getByName,
} = require("../controllers/Event.controllers");

const express = require("express");
const eventRoutes = express.Router();

eventRoutes.post("/", createEvent);
eventRoutes.get("/:id", getById);
eventRoutes.get("/:id",getByName);
eventRoutes.get("/:id",getAll);
module.exports = eventRoutes;
