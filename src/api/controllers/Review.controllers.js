const Review = require("../models/Review.models");
const Event = require("../models/Event.models");
const User = require("../models/User.models");

//------------------------------ CREATE REVIEW ------------------------------
//--------------------------------------------------------------------------
const createReview = async (req, res, next) => {
  try {
    const { email, eventId, description, userId, points } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("No existe el usuario");
    } else {
      const newReview = new Review({
        event: eventId,
        description: description,
        user: userId,
        points: points,
      });

      const savedReview = await newReview.save();

      if (savedReview) {
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json("El evento no existe");
        }

        await User.findByIdAndUpdate(user._id, {
          $push: { review: savedReview._id },
        });

        await Event.findByIdAndUpdate(eventId, {
          $push: { review: savedReview._id },
        });
        return res.status(200).json(savedReview);
      } else {
        return res.status(404).json("No se ha creado correctamente la reseña");
      }
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ DELETE ------------------------------
//----------------------------------------------------------------------
// Modificado
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewToDelete = await Review.findById(id);

    if (!reviewToDelete) {
      return res.status(404).json("La review no existe");
    } else {
      //Guardamos el ID del user y del event
      const idUser = reviewToDelete.user;
      const idEvent = reviewToDelete.event;
      console.log(idUser, idEvent);

      //Buscamos a ese usuario por la ID y le quitamos la review
      await User.findByIdAndUpdate(idUser, {
        $pull: { review: id },
      });
      //Buscamos a ese evento por la ID y le quitamos la review
      await Event.findByIdAndUpdate(idEvent, {
        $pull: { review: id },
      });

      //Borramos la review y enviamos una respuesta segun si se ha borrado correctamente o no
      await Review.findByIdAndDelete(id);

      if (await Review.findById(id)) {
        return res.status(404).json("La review no se ha borrado");
      } else {
        return res.status(200).json("Review borrada");
      }
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETBYALL ------------------------------
//----------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const getByAll = await Review.find().populate("event user");
    if (getByAll) {
      return res.status(200).json(getByAll);
    } else {
      return res.status(404).json("Not found get by all");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETBYID ------------------------------
//----------------------------------------------------------------------

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getById = await Review.findById(id).populate("event user");
    if (getById) {
      return res.status(200).json(getById);
    } else {
      return res.status(404).json("Not found get by id");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createReview, deleteReview, getAll, getById };
