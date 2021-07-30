const express = require("express");
const Cors = require("cors");

require("dotenv").config({ path: "dev.env.local" });

const payment = require("./apis/payment/payment");
const app = express();

const userRouter = require("./routers/user");
const productRouter = require("./routers/products");
const wishlistRouter = require("./routers/wishlist");
const cartRouter = require("./routers/cart");
const orderRouter = require("./routers/orders");
const addressRouter = require("./routers/address");
const addbrandsRouter = require("./routers/addbrands");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Cors({ origin: "http://localhost:3000", credentials: true }));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Hello, client");
});

app.use(productRouter);
app.use(userRouter);
app.use(wishlistRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(addressRouter);
app.use(addbrandsRouter);

//--RazorPay--
app.get("/order", (req, res) => {
  payment(req, res);
});

app.post("/capture/:paymentId", (req, res) => {
  payment(req, res);
});
//---------------
