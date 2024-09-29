import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userEmail: { type: mongoose.Types.ObjectId },
  items: [
    {
      productId: mongoose.Types.ObjectId,
      productDetails: Object,
    },
  ],
});

const CartModel = mongoose.model("Carts", cartSchema);

export default CartModel;
