import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productID: { type: String, unique: true },
  productName: { type: String, require: true },
  description: { type: String },
  price: { type: Number, require: true },
  inventory: { type: Number },
  category: { type: String },
  images: { type: String },
  rateing: { type: Number },
});

const ProductModel = mongoose.model("Products", productSchema);

export default ProductModel;
