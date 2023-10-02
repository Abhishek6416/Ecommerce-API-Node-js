const express = require("express");
const {
  ADD_CART_CONTROLLER,
  VIEW_CART_CONTROLLER,
  INC_CONTROLLER,
  DEC_CONTROLLER,
  DELETE_CART_ITEM_CONTROLLER,
} = require("../controllers/cart-controllers");
const Authorization = require("../middleware/auth");
const cart_router = express.Router();
cart_router.post("/add-cart", Authorization, ADD_CART_CONTROLLER);
cart_router.get("/all-carts", Authorization, VIEW_CART_CONTROLLER);
cart_router.patch("/inc-cart/:id", Authorization, INC_CONTROLLER);
cart_router.patch("/dec-cart/:id", Authorization, DEC_CONTROLLER);
cart_router.delete(
  "/delete-cart/:id",
  Authorization,
  DELETE_CART_ITEM_CONTROLLER
);
module.exports = cart_router;
