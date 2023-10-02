const CartModel = require("../models/cart-schema");
const randomString = require("randomstring");
const UserModel = require("../models/user-schema");
const PaymentModel = require("../models/payment-schema");
const PAYMENT_CONTROLLER = async (req, res) => {
  const { cardNumber, expireDate } = req.body;
  if (cardNumber !== "1234561234561234" || expireDate !== "0224")
    return res
      .status(500)
      .json({ success: false, message: "Invalid credential" });
  try {
    const cartItem = await CartModel.find({});
    const User = await UserModel.find();
    // console.log(User[0].name);
    if (cartItem.length === 0)
      return res.status(500).json({ success: false, message: "No Item found" });
    let totalPrice = cartItem.reduce((acc, currentItem) => {
      return acc + currentItem.price * currentItem.qty;
    }, 0);
    let generatePaymentId = randomString.generate();
    await CartModel.deleteMany({});
    let saveInfo = new PaymentModel({
      userName: User[0].name,
      payemntId: generatePaymentId,
      totalAmount: totalPrice,
    });
    await saveInfo.save();
    return res.status(200).json({
      success: true,
      message: "payment done",
      saveInfo,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = PAYMENT_CONTROLLER;
