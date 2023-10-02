const mongoose = require("mongoose");
const user_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", user_schema);
module.exports = UserModel;
