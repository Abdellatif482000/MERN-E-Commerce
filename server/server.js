import exp from "express";
import cors from "cors";
import { createServer } from "node:http";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = exp();
app.use(cors());
app.use(exp.json());

app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);

dotenv.config();
const PORT = process.env.PORT || 3030;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

const server = createServer(app);

server.listen(PORT, () => {
  console.log(
    "________________________",
    "\n",
    "server running",
    "\n",
    "------------"
  );
});

mongoose.connect(MONGO_URI, {
  dbName: DB_NAME,
});
mongoose.connection.on("connected", () => {
  console.log(
    "Mongoose connected",
    "\n",
    "------------",
    "\n",
    "DB-URI: ( " + MONGO_URI + " )",
    "\n",
    "------------",
    "\n",
    "DB-Name: ( " + DB_NAME + " )",
    "\n",
    "________________________"
  );
});
