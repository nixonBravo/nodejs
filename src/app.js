import express from "express";
import cors from "cors";

import UserRoutes from "./routes/user.routes.js";
import PruebaRoutes from "./routes/prueba.routes.js";

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

app.use("/api", UserRoutes);
app.use("/api", PruebaRoutes);

export default app;