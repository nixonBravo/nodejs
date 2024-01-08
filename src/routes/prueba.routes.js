import { Router } from "express";
import {
  getPruebas,
  getPrueba,
  createPrueba,
  updatePrueba,
  deletePrueba,
} from "../controllers/prueba.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.get("/pruebas", verifyToken, getPruebas);
router.get("/prueba/:id", verifyToken, getPrueba);
router.post("/prueba", verifyToken, createPrueba);
router.put("/prueba/:id", verifyToken, updatePrueba);
router.delete("/prueba/:id", verifyToken, deletePrueba);

export default router;
