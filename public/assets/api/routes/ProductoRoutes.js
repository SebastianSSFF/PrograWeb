import express from "express";
import { getProductos } from "../controller/ProductoController.js";
const router = express.Router();

router.get("/productos", getProductos);
export default router;