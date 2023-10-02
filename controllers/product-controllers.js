const ProductModel = require("../models/product-schema");

const ALL_PRODUCT_CONTROLLER = async (req, res) => {
  try {
    const all_products = await ProductModel.find({});
    if (!all_products)
      return res
        .status(500)
        .json({ success: false, message: "not product avaialbe" });
    return res
      .status(200)
      .json({ success: true, message: "all product fetch", all_products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const SINGLE_PRODUCT_CONTROLLER = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(500)
      .json({ success: false, message: "please provide product id" });
  try {
    const product = await ProductModel.findOne({ _id: id });
    if (!product)
      return res
        .status(500)
        .json({ success: false, message: "Not product found" });
    return res
      .status(200)
      .json({ success: true, message: "single product details...", product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { ALL_PRODUCT_CONTROLLER, SINGLE_PRODUCT_CONTROLLER };
