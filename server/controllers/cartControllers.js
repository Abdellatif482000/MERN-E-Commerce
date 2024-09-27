import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongooseHidden from "mongoose-hidden";

import CartModel from "../models/cartModels.js";
import ProductModel from "../models/productModel.js";
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

export const addToCart = async (req, res) => {
  ProductModel.findOne({
    productID: req.body.productID,
  }).then((product) => {
    console.log("product", product, "\n", "------------");

    CartModel.findOneAndUpdate(
      { userID: req.body.userID },
      { $push: { items: { productId: product._id, productDetails: product } } },
      { new: true }
    ).then((cart) => {
      console.log(cart);
      res.status(200).json({ massege: "Product Added to Cart", cart: cart });
    });
  });
};

export const getCart = async (req, res) => {
  CartModel.findOne({});
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
