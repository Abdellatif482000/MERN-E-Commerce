import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    cartID: { type: String, unique: true },
    items: [
      {
        productId: mongoose.Types.ObjectId,
        productDetails: Object,
      },
    ],
  },
  { _id: false }
);

const CartModel = mongoose.model("Carts", cartSchema);

export default CartModel;
