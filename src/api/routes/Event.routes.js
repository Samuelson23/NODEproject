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

eventRoutes.post("/createEvent", createEvent);
eventRoutes.post("/updateEvent/:id", updateEvent);
eventRoutes.delete("/deleteEvent/:id", deleteEvent);
eventRoutes.get("/:id", getById);
eventRoutes.get("/name/:name", getByName);
eventRoutes.get("/", getAll);
module.exports = eventRoutes;
