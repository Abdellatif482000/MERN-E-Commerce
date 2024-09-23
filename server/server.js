import exp from "express";
import cors from "cors";
import { createServer } from "node:http";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes.js";

const app = exp();
app.use(cors());
app.use(exp.json());

app.use("/", authRoutes);

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
    "DBURI: (" + MONGO_URI + ")",
    "\n",
    "------------",
    "\n",
    "DBName: (" + DB_NAME + ")",
    "\n",
    "________________________"
  );
});
