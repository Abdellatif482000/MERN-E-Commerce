import { Router, json } from "express";

import {
  addToCart,
  getCart,
  //   modifyProduct,
  //   deleteProduct,
} from "../controllers/cartControllers";

const cartRoutes = Router();

cartRoutes.post("/addToCart", addToCart);
cartRoutes.get("/getCart", getCart);
// cartRoutes.put("/updateProduct", modifyProduct);
// cartRoutes.delete("/deleteProduct", deleteProduct);

export default cartRoutes;
