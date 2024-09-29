import { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// ------------------------------------
import CartModel from "../models/cartModels";
import ProductModel from "../models/productModel";
import UserModel from "../models/authModel";
// ------------------------------------
dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/e-commerce?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1/";
const DB_NAME = process.env.DB_NAME || "e-commerce";

mongoose.connect(MONGO_URI, {
  dbName: DB_NAME,
});
// ------------------------------------

export const addToCart = async (req: Request, res: Response) => {
  ProductModel.findOne({
    productID: req.body.productID,
  }).then((product: any) => {
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

export const getCart = async (req: Request, res: Response) => {
  CartModel.findOne({});
};

export const modifyProduct = async (req: Request, res: Response) => {
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

export const deleteProduct = async (req: Request, res: Response) => {
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
