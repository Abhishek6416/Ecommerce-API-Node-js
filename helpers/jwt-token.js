const jwt = require("jsonwebtoken");
const GenerateToken = async (id) => {
  const JWT_KEY = process.env.JWT_SECRET_KEY;
  try {
    const token = jwt.sign({ id }, JWT_KEY, { expiresIn: "1d" });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = GenerateToken;
