const express = require("express");
const {
  REGISTER_USER_CONTROLLER,
  LOGIN_USER_CONTROLLER,
} = require("../controllers/user-controllers");
const user_router = express.Router();
// REGISTER | POST
user_router.post("/user-register", REGISTER_USER_CONTROLLER);
// LOGIN | POST
user_router.post("/user-login", LOGIN_USER_CONTROLLER);
module.exports = user_router;
