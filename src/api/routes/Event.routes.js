const {
  create,
  updateEvent,
  deleteEvent,
  getAll,
  getById,
  getByName,
} = require("../controllers/Event.controllers");

const express = require("express");
const eventRoutes = express.Router();

eventRoutes.post("/", create);

module.exports = eventRoutes;
