import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    const decoded = await jwt.verify(token, TOKEN_KEY);
    if (!decoded.user_id) {
      console.error(
        "Error: El objeto decodificado no contiene un ID de usuario válido"
      );
      return res
        .status(401)
        .json({ message: "Token inválido: user_id no encontrado" });
    }
    req.user = { user_id: decoded.user_id };
    console.log("Usuario decodificado:", decoded);
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return res.status(401).json({ message: "Token inválido" });
  }
  return next();
};
