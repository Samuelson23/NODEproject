const { deleteImgCloudinary, configCloudinary } = require("../../middleware/files.middleware");
const randomPassword = require("../../utils/randomPass");
const { generateToken } = require("../../utils/token");
const randomCode = require("../../utils/randomCode");
const Review = require("../models/Review.models");
const Event = require("../models/Event.models");
const User = require("../models/User.models");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

configCloudinary();
dotenv.config();

//------------------------------ REGISTER ------------------------------
//----------------------------------------------------------------------

const register = async (req, res, next) => {
  let userImage = req.file?.path;
  try {
    //Creamos el codigo de verificacion con la funcion importada randomCode() y nos guardamos el name y email que nos pasa por la request
    let confirmationCode = randomCode();
    const { email, name } = req.body;

    //Buscamos a ver si existe ese name y ese email en la base de datos
    const userExist = await User.findOne({
      email: req.body.email,
      name: req.body.name,
    });

    //Si el usuario ya se encuentra en la base de datos le decimos que ya esta registrado y sino lo registramos
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.imagen = userImage;
      } else {
        newUser.imagen =
          "https://res.cloudinary.com/dwbw3uill/image/upload/v1684827346/png-clipart-graphics-arrest-youtuber-anonymous-angle-rectangle-thumbnail_zyxs7h.png";
      }

      //guardamos el usuario
      const userSave = await newUser.save();

      //comprobamos si se ha guardado bien. De ser asi le enviamos el correo de verificacion con el codigo de confirmacion. Todo esto lo hacemos con nodemailer
      if (userSave) {
        const emailDB = process.env.EMAIL;
        const passwordDB = process.env.PASSWORD;

        //El transporter es el metodo por el cual se envia el correo (serivicio=gmail y los datos de quien lo envia, en este caso el email y pass de nuestra base de datos)
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailDB,
            pass: passwordDB,
          },
        });

        //Creamos las opciones del email (quien lo envia, a quien, y lo que le vamos a decir en el email)
        const mailOptions = {
          from: emailDB,
          to: email,
          subject: "Confirmation code",
          text: `Tu codigo de confirmacion ${confirmationCode}. Gracias por registrarte ${name}`,
        };

        //Enviamos el correo y comprobamos que no haya un error. Si hay un error devolvemos un 404 y si no hay ningun error devolvemos un 200 con el usuario y su codigo de confirmacion
        transporter.sendMail(mailOptions, function (error) {
          if (error) {
            console.log(error);
            return res.status(404).json({
              user: userSave,
              confirmationCode: "error en el codigo de confirmacion",
            });
          } else {
            console.log("Email enviado");
            return res.status(200).json({
              user: userSave,
              confirmationCode,
            });
          }
        });
      }

      //Si el usuario ya existe en la base de datos lanzamos un error 409 de conflicto, porque ya está registrado y borramos la imagen que nos ha enviado en la request porque se ha subido a Cloudinary
    } else {
      deleteImgCloudinary(userImage);
      return res.status(409).json("El usuario ya existe");
    }
  } catch (error) {
    //deleteImgCloudinary(userImage);
    return next(error);
  }
};

//------------------------------ RESEND CODE --------------------------
//---------------------------------------------------------------------
const resendCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const emailDB = process.env.EMAIL;
    const passDB = process.env.PASSWORD;
    const userToSendCode = await User.findOne({ email });
    console.log(userToSendCode);
    const confirmationCode = userToSendCode.confirmationCode;
    console.log("107----------", confirmationCode);
    if (userToSendCode) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailDB,
          pass: passDB,
        },
      });
      const mailOptions = {
        from: emailDB,
        to: email,
        subject: "Confirmation code",
        text: `Hola! Te enviamos de nuevo tu codigo de confirmacion: ${confirmationCode}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({ resendCode: true });
        }
      });
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ NEW CODE -----------------------------
//---------------------------------------------------------------------

//------------------------------ CHECK USER --------------------------
//---------------------------------------------------------------------
const checkUser = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;
    const checkUser = await User.findOne({ email });
    console.log("145---------", confirmationCode);
    console.log(checkUser.confirmationCode);
    if (!checkUser) {
      return res.status(404).json("Ese usuario no existe");
    } else {
      if (confirmationCode == checkUser.confirmationCode) {
        await checkUser.updateOne({ check: true });
        const updateUser = await User.findOne({ email });
        return res.status(200).json({
          testCheck: updateUser.check === true ? true : false,
        });
      } else {
        return res
          .status(404)
          .json(
            "El codigo introducido no es valido. Te hemos enviado el codigo de nuevo a tu correo."
          );
      }
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ FORGOT PASS --------------------------
//---------------------------------------------------------------------

const forgotPassword = async (req, res, next) => {
  try {
    //Recogemos el email del usuario que quiere cambiar la contraseña
    //Buscamos al usuario por su email y creamos una contraseña nueva con randomPassword()
    const emailUser = req.body.email;
    const userDB = await User.findOne({ email: emailUser });
    const newPassword = randomPassword();
    console.log("CONSOLELOG USER", userDB);
    //console.log(emailUser);
    //Si el usuario existe en nuestra base de datos le enviamos un correo mediante nodemailer con la nueva contraseña
    if (userDB) {
      const idUser = userDB._id;
      console.log("id", idUser);
      const emailDB = process.env.EMAIL;
      const passDB = process.env.PASSWORD;
      console.log(emailDB, passDB);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailDB,
          pass: passDB,
        },
      });

      const mailOptions = {
        from: emailDB,
        to: emailUser,
        subject: "Nuevo acceso",
        text: `User: ${userDB.name} tu nueva clave de acceso es: ${newPassword}`,
      };

      transporter.sendMail(mailOptions, async function (error) {
        if (error) {
          console.log(error);
          return res.status(404).json("No se ha enviado el correo");
        }
        //Cuando enviamos el correo encriptamos la contraseña y actualizamos el usuario en nuestra base de datos.
        else {
          const newPasswordEncrypt = bcrypt.hashSync(newPassword, 10);
          console.log("passEnc", newPasswordEncrypt);
          await User.findByIdAndUpdate(idUser, { password: newPasswordEncrypt });
          const updateUser = await User.findById(idUser);
          console.log(updateUser);
          //Comprobamos que la contraseña actualizada en la base de datos coincide con la contraseña encriptada
          if (bcrypt.compareSync(newPassword, updateUser.password)) {
            return res.status(200).json({
              userUpdate: true,
              passUpdate: true,
            });
          } else {
            return res.status(404).json({
              userUpdate: false,
              passUpdate: false,
            });
          }
        }
      });
    } else {
      return res.status(404).json("No se ha encontrado ningun user con ese email");
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

//------------------------------ CHANGE PASS ----------------------------------
//-----------------------------------------------------------------------------

const changePassword = async (req, res, next) => {
  try {
    //Nos traemos el email, la password y la nueva password por la request. Con el email buscamos el user al que queremos cambiarle la contraseña
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });
    const userID = user._id;

    //Comparamos la contraseña introducida para ver si es el usuario real, ya que necesitamos comprobar que se sepa la contraseña de la cuenta para poder hacer el cambio
    if (bcrypt.compareSync(password, user.password)) {
      //Si las contraseñas coinciden procedemos. Hacemos el encriptado de la newPassword y hacemos un update del user modificando la contraseña
      const newPasswordEncrypt = bcrypt.hashSync(newPassword, 10);
      await User.findByIdAndUpdate(userID, { password: newPasswordEncrypt });

      //Buscamos el usuario para comprobar que se haya actualizado la contraseña. Si es asi, devolvemos un 200 con true y sino un 404 con false
      const userUpdate = await User.findById(userID);
      console.log(userUpdate);
      if (bcrypt.compareSync(newPassword, userUpdate.password)) {
        return res.status(200).json({
          updateUser: true,
          updatePassword: true,
        });
      } else {
        return res.status(404).json({
          updateUser: false,
          updatePassword: false,
        });
      }
    } else {
      return res.status(404).json("La contraseña introducida es incorrecta");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ UPDATE ------------------------------
//--------------------------------------------------------------------

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, image, events } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    } else {
      if (name) {
        user.name = name;
      }
      if (image) {
        user.image = image;
      }
      if (events) {
        user.events = events;
      }
    }

    const updatedUser = await user.save();

    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json("No se ha podido actualizar el usuario");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ DELETE ------------------------------
//--------------------------------------------------------------------

const deleteUser = async (req, res, next) => {
  try {
    console.log(req.body);
    //Recogemos el email de la request y buscamos al usuario por su email para obtener la ID y despues borrarlo con findByIdAndDelete
    const { email } = req.body;
    console.log(email);
    const userToDelete = await User.findOne({ email });
    //Aqui guardamos todas las reviews que ha creado el usuario para poder borrarlas cuando borremos al user
    const reviewsUser = userToDelete.review;
    const eventsUser = userToDelete.events;
    //Buscamos la ID del usuario y lo borramos
    const userID = userToDelete._id;
    await User.findByIdAndDelete(userID);
    console.log(userToDelete);
    console.log(reviewsUser);
    if (await User.findById(userID)) {
      return res.status(404).json("No se ha podido borrar el usuario");
    } else {
      //Recorremos el array de eventos que contiene las IDS de los eventos a los que se ha apuntado el user. Buscamos el evento con un findbyIdAndUpdate para actualizarle el campo que queramos, en este caso el de user. Con " $pull " lo que hacemos es quitar del campo "user" el valor de la id que queremos, en este caso userID que es el id del user que hemos borrado.
      eventsUser.forEach(async (id) => {
        await Event.findByIdAndUpdate(id);
      });
      //Recorremos el array de reviews que contiene las IDS de las reviews que ha creado el user. Buscamos la review con un findbyIdAndUpdate para actualizarle el campo que queramos, en este caso el de user. Con " $pull " lo que hacemos es quitar del campo "user" el valor de la id que queremos, en este caso userID que es el id del user que hemos borrado.
      reviewsUser.forEach(async (id) => {
        await Review.findByIdAndDelete(id);
      });

      deleteImgCloudinary(userToDelete.imagen);
      return res.status(200).json("Se ha borrado el usuario correctamente");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ LOGIN ------------------------------
//-------------------------------------------------------------------

const login = async (req, res, next) => {
  try {
    //Nos guardamos el email y la pass de la request y buscamos en la base de datos al usuario por su email
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    //Si el usuario existe comparamos las contraseñas y en caso de coincidan creamos un token de inicio de sesion
    if (userDB) {
      if (bcrypt.compareSync(password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: { email, _id: userDB._id },
          token,
        });
      } else {
        return res.status(404).json("Contraseña incorrecta");
      }
    } else {
      return res.status(404).json("El usuario no existe");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ CHANGE EMAIL ------------------------------
//--------------------------------------------------------------------------
const changeEmail = async (req, res, next) => {
  try {
    //Recogemos los datos del email, contraseña y nuevo email de la request y buscamos al usuario por email
    const { email, password, newEmail } = req.body;
    const user = await User.findOne({ email });
    console.log(user.password);
    console.log(newEmail);

    //Si el usuario existe pasamos a comprobar que la contraseña introducida es la correcta. En caso de ser correcta hacemos un updateOne de la clave email y actualizamos el email al nuevo que nos ha pasado
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        await user.updateOne({ email: newEmail });
        //await userUpdated.save();
        const userUpdated = await user.save();

        console.log(userUpdated.password);
        //Guardamos el usuario y si el usuario es correcto devolvemos un test para ver que se ha actualizado bien
        if (userUpdated) {
          return res.status(200).json({
            userUpdated: true,
            emailUpdated: true,
          });
        } else {
          return res.status(404).json({
            userUpdated: false,
            emailUpdated: false,
          });
        }
      } else {
        return res.status(404).json("Las contraseñas no coinciden");
      }
    } else {
      return res.status(404).json("No se ha encontrado el usuario");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ ADD TO EVENT ------------------------------
//--------------------------------------------------------------------------

const addToEvent = async (req, res, next) => {
  try {
    const { email, events } = req.body;
    const user = await User.findOne({ email });
    //Creamos un array con los eventos introducidos en la request
    const arrayEvents = events.split(",");
    console.log(arrayEvents);
    //Si el usuario existe, recorremos el array con todos los eventos que se hayan introducido para:
    //    1) a User.events le puseamos cada uno de los eventos (las ids)
    //    2) buscamos el evento por la ID y a ese evento le actualizamos el Event.user para que salga el usuario
    if (user._id) {
      arrayEvents.forEach(async (item) => {
        console.log("item", item);
        await User.findByIdAndUpdate(user._id, {
          $push: { events: item },
        });

        const eventById = await Event.findById(item);
        await eventById.updateOne({
          $push: { user: user._id },
        });
        return res.status(200).json("Usuario inscrito correctamente al evento");
      });
    } else {
      return res.status(404).json("No existe el usuario");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ ADD REVIEW ------------------------------
//--------------------------------------------------------------------------
const addReview = async (req, res, next) => {
  try {
    const { email, eventId, description, userId, points } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("No existe el usuario");
    }

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
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETALL ------------------------------
//--------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate("events review");
    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(404).json("No se ha encontrado ningun usuario");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETBYID ------------------------------
//---------------------------------------------------------------------

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id).populate("events review");
    if (userById) {
      return res.status(200).json(userById);
    } else {
      return res.status(404).json("Not found user by id");
    }
  } catch (error) {
    return next(error);
  }
};

//------------------------------ GETBYNAME ------------------------------
//-----------------------------------------------------------------------

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const usersByName = await User.find({ name });
    if (usersByName) {
      return res.status(200).json(usersByName);
    } else {
      return res.status(404).json("Not found user by name");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  getAll,
  getById,
  getByName,
  forgotPassword,
  changePassword,
  login,
  updateUser,
  deleteUser,
  addToEvent,
  resendCode,
  checkUser,
  addReview,
  changeEmail,
};
