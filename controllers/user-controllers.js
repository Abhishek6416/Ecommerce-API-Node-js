const { Hash_Password, Match_Password } = require("../helpers/hash-password");
const GenerateToken = require("../helpers/jwt-token");
const UserModel = require("../models/user-schema");

// REGISTER || POST
const REGISTER_USER_CONTROLLER = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(500).json({
      success: false,
      message: "Please fill all the details...",
    });
  try {
    const existUser = await UserModel.findOne({ email });
    if (existUser)
      return res
        .status(500)
        .json({ success: false, message: "email already exist.." });
    const hashPassword = await Hash_Password(password);
    const newUser = new UserModel({ ...req.body, password: hashPassword });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User register successfull",
    });
  } catch (error) {
    return res.statu(500).json({
      success: false,
      message: error.message,
    });
  }
};

const LOGIN_USER_CONTROLLER = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(500)
      .json({ success: false, message: "Please fill all details..." });
  try {
    const existUser = await UserModel.findOne({ email });
    if (!existUser)
      return res
        .status(500)
        .json({ success: false, message: "User does'nt exist..." });
    const matchPassword = await Match_Password(password, existUser.password);
    if (!matchPassword)
      return res
        .status(500)
        .json({ success: false, message: "Wrong credential..." });
    const createToken = await GenerateToken(existUser._id);
    return res.status(200).json({
      success: true,
      Token: createToken,
      message: "User login successfulll",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { REGISTER_USER_CONTROLLER, LOGIN_USER_CONTROLLER };
