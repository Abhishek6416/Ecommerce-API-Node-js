const bcrypt = require("bcrypt");
const Hash_Password = async (password) => {
  const saltRounds = 10;
  return bcrypt
    .hash(password, saltRounds)
    .then((res) => res)
    .catch((er) => er);
};
const Match_Password = async (password, hashPassword) => {
  try {
    const verifyUser = await bcrypt.compare(password, hashPassword);
    return verifyUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { Hash_Password, Match_Password };
