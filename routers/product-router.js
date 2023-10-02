const express = require("express");
const {
  ALL_PRODUCT_CONTROLLER,
  SINGLE_PRODUCT_CONTROLLER,
} = require("../controllers/product-controllers");
const product_router = express.Router();
product_router.get("/all-products", ALL_PRODUCT_CONTROLLER);
product_router.get("/single-product/:id", SINGLE_PRODUCT_CONTROLLER);
module.exports = product_router;
