const User = require("../api/models/User.models");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Beare", "");
  if (!token) {
    return next(new Error("No autorizado"));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "admin") {
      return next(new Error("No tienes permisos. No eres admin"));
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = isAdmin;
