const mongoose = require("mongoose");
const cart_schema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: false },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String },
    qty: Number,
  },
  { timestamps: true }
);

const CartModel = mongoose.model("cart", cart_schema);
module.exports = CartModel;
