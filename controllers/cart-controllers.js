const CartModel = require("../models/cart-schema");

const ADD_CART_CONTROLLER = async (req, res) => {
  const { title } = req.body;
  try {
    let existItem = await CartModel.findOne({ title });
    if (existItem)
      return res
        .status(400)
        .json({ success: true, message: "Item already in the cart.." });
    const newItem = new CartModel({ ...req.body, qty: 1 });
    await newItem.save();
    return res
      .status(200)
      .json({ success: true, message: "product add to cart" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const VIEW_CART_CONTROLLER = async (req, res) => {
  try {
    const all_carts = await CartModel.find({});
    if (!all_carts)
      return res
        .status(500)
        .json({ success: false, message: "not product avaialbe" });
    return res
      .status(200)
      .json({ success: true, message: "all cart Item fetch", all_carts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const INC_CONTROLLER = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ success: false, message: "Id not found..." });
  try {
    let cartItem = await CartModel.findOne({ _id: id });
    if (!cartItem)
      return res
        .status(500)
        .json({ success: false, message: "Item not found..." });
    cartItem.qty = cartItem.qty + 1;
    await cartItem.save();
    return res
      .status(200)
      .json({ success: true, message: "qty increases", cartItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const DEC_CONTROLLER = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ success: false, message: "Id not found..." });
  try {
    let cartItem = await CartModel.findOne({ _id: id });
    if (!cartItem)
      return res
        .status(500)
        .json({ success: false, message: "Item not found..." });
    if (cartItem?.qty === 1)
      return res
        .status(500)
        .json({ success: false, message: "Qty is 1 so you can not decrese" });
    cartItem.qty = cartItem.qty - 1;
    await cartItem.save();
    return res
      .status(200)
      .json({ success: true, message: "qty decrease", cartItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const DELETE_CART_ITEM_CONTROLLER = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(500)
      .json({ success: false, message: "Please provide id" });
  try {
    await CartModel.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ success: true, message: "Item deleted successfulll" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  ADD_CART_CONTROLLER,
  VIEW_CART_CONTROLLER,
  INC_CONTROLLER,
  DEC_CONTROLLER,
  DELETE_CART_ITEM_CONTROLLER,
};
