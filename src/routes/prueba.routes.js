import { Router } from "express";
import {
  getPruebas,
  getPrueba,
  createPrueba,
  updatePrueba,
  deletePrueba,
} from "../controllers/prueba.controller.js";

const router = Router();

router.get("/pruebas", getPruebas);
router.get("/prueba/:id", getPrueba);
router.post("/prueba", createPrueba);
router.put("/prueba/:id", updatePrueba);
router.delete("/prueba/:id", deletePrueba);

export default router;
