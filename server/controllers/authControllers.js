import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import UserModel from "../models/authModel.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(MONGO_URI, {
  dbName: DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const saltRounds = 10;

export const signup = async (req, res) => {
  try {
    // const { username, password, email, phoneNum, role } = req.body;
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      phoneNum: req.body.phoneNum,
      password: hashedPass,
      role: req.body.role,
    });

    UserModel.create({
      username: req.body.username,
      email: req.body.email,
      phoneNum: req.body.phoneNum,
      password: hashedPass,
      role: req.body.role,
    });

    // await newUser.save();

    console.log(newUser);

    res.status(200).json({ massege: "inserted", data: newUser });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

export const signin = async (req, res) => {
  try {
    const { password, email } = req.body;

    UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            console.log("Is pass Match? " + isMatch);
            if (isMatch) {
              const token = jwt.sign({ ID: req.body.ID }, JWT_SECRET, {
                expiresIn: "1h",
              });
              res.status(200).send({ token, user });
              console.log("userData: " + user);
            } else {
              res.status(401).json({ massage: "Invalid pass" });
            }
          })
          .catch((err) => {
            res.status(401).json({ massage: "Unexpected", error: err });
          });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
