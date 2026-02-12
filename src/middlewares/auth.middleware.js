import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ResponseHandler from "../utils/responseHandler.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ResponseHandler.unauthorized(res, "No token provided");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.secret);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role // optional, if you include role in JWT
    };

    next();
  } catch (error) {
    return ResponseHandler.unauthorized(res, "Unauthorized: Invalid token");
  }
};

export default authMiddleware;
