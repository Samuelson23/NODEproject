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

module.exports = eventRoutes;
