const mongoose = require("mongoose");
const product_schema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("product", product_schema);
module.exports = ProductModel;
