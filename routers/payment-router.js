const express = require("express");
const Authorization = require("../middleware/auth");
const PAYMENT_CONTROLLER = require("../controllers/payment-controllers");
const payment_router = express.Router();
payment_router.post("/payment", Authorization, PAYMENT_CONTROLLER);
module.exports = payment_router;
