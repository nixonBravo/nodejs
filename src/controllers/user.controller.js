import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TOKEN_KEY } from "../config/config.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Existen campos vacios" });
    }

    const oldUser = await User.findOne({ where: { email: email } });
    if (oldUser) {
      return res.status(409).json({ message: "Email esta en uso" });
    }

    const encryptedPassword = await bcrypt.hash(password.toString(), 10);

    const userData = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jwt.sign({ user_id: userData.id, email }, TOKEN_KEY, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ message: "Registrado Exitosamente", userData, token });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: error.errors[0].message });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const login = async (req, res) => {
  try {
    let response = {};

    const { email, password } = req.body;

    if (!(email && password)) {
      response = { status: 400, data: { message: "Existen campos vacios" } };
    } else {
      const user = await User.findOne({
        where: { email: email.toLowerCase() },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user.id, email }, TOKEN_KEY, {
          expiresIn: "1h",
        });
        let userData = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        response = {
          status: 200,
          data: { message: "Logeado Exitosamente", userData, token: token },
        };
      } else {
        response = { status: 400, data: { message: "Credenciales Invalidas" } };
      }
    }

    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
