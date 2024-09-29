import exp from "express";
import cors from "cors";
import { createServer } from "node:http";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = exp();
app.use(cors());
app.use(exp.json());

app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);

dotenv.config();
const PORT = process.env.PORT || 0;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/e-commerce?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1/";
const DB_NAME = process.env.DB_NAME || "e-commerce";

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

if (!DB_NAME) {
  throw new Error("DB_NAME is not defined");
}

const server = createServer(app);

server.listen(PORT, () => {
  console.log(
    "________________________",
    "\n",
    `server running on port ${PORT}`,
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
