const isAdmin = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");

const {
  deleteReview,
  getAll,
  getById,
  getByName,
  createReview
} = require("../controllers/Review.controllers");

const express = require("express").Router();

const reviewRoutes = express;

reviewRoutes.delete("/deleteReview", deleteReview);
reviewRoutes.get("/name/:name", getByName);
reviewRoutes.get("/", getAll);
reviewRoutes.get("/:id", getById);
reviewRoutes.post("/createReview", createReview);

module.exports = userRoutes;