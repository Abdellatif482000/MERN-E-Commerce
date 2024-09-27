import { Router, json } from "express";

import {
  createProduct,
  getProduct,
  modifyProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

const productRoutes = Router();

productRoutes.post("/addProduct", createProduct);
productRoutes.get("/getProduct", getProduct);
productRoutes.put("/updateProduct", modifyProduct);
productRoutes.delete("/deleteProduct", deleteProduct);

export default productRoutes;
