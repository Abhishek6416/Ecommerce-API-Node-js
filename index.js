const express = require("express");
require("dotenv").config();
const cors = require("cors");
const user_router = require("./routers/user-router");
const DB_CONNECT = require("./configs/db");
const addBulkData = require("./bulk-data/ProductArray");
const cart_router = require("./routers/cart-router");
const product_router = require("./routers/product-router");
const payment_router = require("./routers/payment-router");
const app = express();
const port = process.env.SERVER_PORT;
// middle ware
app.use(cors());
app.use(express.json());
// router
app.get("/", async (req, res) =>
  res.send("Triveous assignment...Backend... Ecom..App ready...")
);
app.use("/api/v1", user_router);
app.use("/api/v1", cart_router);
app.use("/api/v1", product_router);
app.use("/api/v1", payment_router);
app.use("*", async (req, res) => {
  return res.status(500).json({
    success: false,
    message: `${req.originalUrl} this url not valid`,
  });
});
const server = app.listen(8080, () =>
  console.log(`SERVER RUN ON PORT ${port}`)
);
DB_CONNECT().catch((error) => console.log(error.message));
addBulkData();
// chekc connection
server.on("listening", () => console.log("CONNECTION OKAY..."));
// when error found
server.on("error", (error) => console.log("error while server connect", error));
