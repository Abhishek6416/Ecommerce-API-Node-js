const mongoose = require("mongoose");
const payment_schema = new mongoose.Schema(
  {
    userName: String,
    payemntId: String,
    totalAmount: Number,
  },
  { timestamps: true }
);
const PaymentModel = mongoose.model("payment", payment_schema);
module.exports = PaymentModel;
