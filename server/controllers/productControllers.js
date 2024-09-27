import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongooseHidden from "mongoose-hidden";

import ProductModel from "../models/productModel.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(MONGO_URI, {
  dbName: DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const createProduct = async (req, res) => {
  const newProduct = new ProductModel(req.body);

  await newProduct
    .validate()
    .then(async () => {
      console.log(
        "requested data: ",
        req.body,
        "\n",
        "-------------",
        "\n",
        "new instance of the ProductModel before save in DB : ",
        "\n",
        newProduct,
        "\n",
        "-------------",
        "\n",
        "Data is valid"
      );

      await newProduct.save().then((product) => {
        console.log(
          "-------------",
          "\n",
          "Data in DB:",
          "\n",
          product,
          "\n",
          "-------------"
        );
        res
          .status(200)
          .json({ massege: "new product inserted", data: product });
      });
    })
    .catch((err) => {
      res.status(400).json({ massege: "Not Valid", error: err });

      console.error("----- not valid ------", "\n", err, "\n", "-----------");
    });
};

export const getProduct = async (req, res) => {
  try {
    const { productName } = req.body;

    ProductModel.findOne({ productName: productName }).then((product) => {
      console.log(product);

      res.status(302).json({ massege: "Product Found", data: product });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const modifyProduct = async (req, res) => {
  const { productName, newRate } = req.body;

  ProductModel.findOneAndUpdate(
    { productName: productName },
    { $set: { rateing: newRate } },
    { new: true }
  )
    .then((product) => {
      console.log(product);
      res.status(200).json({ massege: "Product Updated", data: product });
    })
    .catch((err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
};

export const deleteProduct = async (req, res) => {
  const { productName } = req.body;

  ProductModel.findOneAndDelete({ productName: productName })
    .then((product) => {
      console.log(product);
      res.status(200).json({ massege: "Product Deleted", data: product });
    })
    .catch((err) => {
      console.log(err);
    });
};
