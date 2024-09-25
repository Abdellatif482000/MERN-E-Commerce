import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongooseHidden from "mongoose-hidden";

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

export const signup = async (req, res) => {
  const newUser = new UserModel(req.body);

  await newUser
    .validate()
    .then(async () => {
      console.log(
        "requested data: ",
        req.body,
        "\n",
        "-------------",
        "\n",
        "-------------",
        "\n",
        "new instance of the UserModel: ",
        "\n",
        newUser,
        "\n",
        "Data is valid"
      );

      await newUser.save().then((user) => {
        console.log(
          "-------------",
          "\n",
          "data in DB:",
          "\n",
          user,
          "\n",
          "-------------"
        );
        res.status(200).json({ massege: "inserted", data: user });
      });
    })
    .catch((err) => {
      res.status(400).json({ massege: "Not Valid", error: err });

      console.error("----- not valid ------", "\n", err, "\n", "-----------");
    });
  // try {
  //   // ----- check valid -----

  //   // ----- save -----

  // } catch (err) {
  //   console.log("not valid", err);
  // }
};

export const signin = async (req, res) => {
  try {
    const { password, email } = req.body;

    UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            console.log("Is pass match? " + isMatch);
            if (isMatch) {
              const token = jwt.sign(
                { username: user.username, email: user.email },
                JWT_SECRET,
                {
                  expiresIn: "1h",
                }
              );

              console.log("userData: " + user);
              console.log("Full Name with virtuals: " + user.fullName);
              res.status(200).send({ token, user });

              console.log("--------------");
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
