const mongoose = require("mongoose");
const DB_CONNECT = async () => {
  const URL = process.env.MONGO_URL;
  const dbase = await mongoose.connect(URL, { useNewUrlParser: true });
  console.log(dbase.connection.db.databaseName);
};

module.exports = DB_CONNECT;
