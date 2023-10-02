const jwt = require("jsonwebtoken");
const Authorization = async (req, res, next) => {
  const token = req.headers.authorization;
  const JWT_KEY = process.env.JWT_SECRET_KEY;
  try {
    const verifyUser =  jwt.verify(token, JWT_KEY);
    // console.log(verifyUser);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = Authorization;
