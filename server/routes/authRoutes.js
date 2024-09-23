import { Router, json } from "express";

import { signup, signin } from "../controllers/authControllers.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.get("/signin", signin);

export default authRoutes;
