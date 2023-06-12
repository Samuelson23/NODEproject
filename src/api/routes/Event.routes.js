const { isAdmin, isAuth } = require("../../middleware/auth.middleware");
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

eventRoutes.post("/createEvent", [isAdmin], createEvent);
eventRoutes.patch("/updateEvent/:id", [isAdmin], updateEvent);
eventRoutes.delete("/deleteEvent/:id", [isAdmin], deleteEvent);
eventRoutes.get("/:id", getById);
eventRoutes.get("/name/:name", getByName);
eventRoutes.get("/", getAll);
module.exports = eventRoutes;
