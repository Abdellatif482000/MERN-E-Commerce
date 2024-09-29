import dotenv from "dotenv";
import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
import { Request, Response } from "express";
// --------------------
import ProductModel from "../models/productModel";
// --------------------

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/e-commerce?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1/";
const DB_NAME = process.env.DB_NAME || "e-commerce";

mongoose.connect(MONGO_URI, {
  dbName: DB_NAME,
});

export const createProduct = async (req: Request, res: Response) => {
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

export const getProduct = async (req: Request, res: Response) => {
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
