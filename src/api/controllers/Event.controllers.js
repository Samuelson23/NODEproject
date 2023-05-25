const Review = require("../models/Review.models");
const Event = require("../models/Event.models");
const User = require("../models/User.models");

//------------------------------ CREATE EVENT ------------------------------
//--------------------------------------------------------------------------

const createEvent = async (req, res, next) => {
  try {
    const { email, evName, description, location, data, hour } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    if (user.role !== "admin") {
      return res.status(404).json("No tienes permisos de administrador");
    } else {
      const newEvent = new Event({
        name: evName,
        location: location,
        data: data,
        hour: hour,
        description: description,
      });
      const saveEvent = await newEvent.save();
      console.log(saveEvent);

      if (saveEvent) {
        return res.status(200).json(saveEvent);
      } else {
        return res.status(404).json("No se ha creado bien el evento ");
      }
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ UPDATE ------------------------------
//----------------------------------------------------------------------

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, location, data, hour, description } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json("Evento no encontrado");
    } else {
      if (name) {
        event.name = name;
      }
      if (location) {
        event.location = location;
      }
      if (data) {
        event.data = data;
      }
      if (hour) {
        event.hour = hour;
      }
      if (description) {
        event.description = description;
      }
    }

    const updatedEvent = await event.save();

    if (updatedEvent) {
      return res.status(200).json(updatedEvent);
    } else {
      return res.status(404).json("No se ha podido actualizar el evento");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ DELETE ------------------------------
//----------------------------------------------------------------------

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventToDelete = await Event.findById(id);

    if (!eventToDelete) {
      return res.status(404).json("El evento no existe");
    }

    // Borramos todas las reviews asociadas al evento
    const reviewsEvent = eventToDelete.review;
    reviewsEvent.forEach(async (reviewId) => {
      await Review.findByIdAndDelete(reviewId);
    });

    //Recorremos todas las ids de los usuarios que se han apuntado a ese evento y, de cada usuario, le borramos el evento que vamos a eliminar
    /* const userEvents = eventToDelete.user;
    userEvents.forEach(async (id) => {
      await User.findByIdAndUpdate(id, {
        $pull: { events: eventToDelete },
      });
    }); */

    // Borramos el evento y le devolvemos una respuesta segun si se ha borrado bien o no
    await Event.findByIdAndDelete(id);

    if (await Event.findById(id)) {
      return res.status(404).json("El evento no se ha borrado");
    } else {
      return res.status(200).json("Evento borrado");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETBYALL ------------------------------
//----------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const allEvent = await Event.find().populate("user review");
    if (allEvent) {
      return res.status(200).json(allEvent);
    } else {
      return res.status(404).json("Not found all Event");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETBYNAME ------------------------------
//----------------------------------------------------------------------

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const eventByName = await Event.find({ name }).populate("user review");
    if (eventByName) {
      return res.status(200).json(eventByName);
    } else {
      return res.status(404).json("Not found Event by name");
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
    const eventById = await Event.findById(id).populate("user review");

    if (eventById) {
      return res.status(200).json(eventById);
    } else {
      return res.status(404).json("not found eventById");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createEvent, updateEvent, deleteEvent, getAll, getById, getByName };
