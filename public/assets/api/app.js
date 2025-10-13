import express from "express";
import { getProductos } from "../controller/ProductoController.js";
import cors from "cors";
import dotenv from "dotenv";
import ProductoRoutes from "./routes/ProductoRoutes.js";

const router = express.Router();
router.get("/productos", getProductos);
export default router;
dot.env.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", ProductoRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});