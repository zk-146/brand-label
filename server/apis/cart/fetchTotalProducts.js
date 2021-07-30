// import jwt from "jsonwebtoken";
const Cart = require("../../models/dbCart");
const Authenticated = require("../../helpers/Authenticated");
const initDB = require("../../helpers/initDB");
const get_cookies = require("../../helpers/getCookies");
const jwt = require("jsonwebtoken");

initDB();

const fetchTotalProducts = Authenticated(async (req, res) => {
  const authorization = get_cookies(req).token;

  const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

  let totalQuantity = 0;
  const totalProducts = await Cart.find({ user: userId });
  const product1 = totalProducts[0].products;
  for (let i = 0; i < product1.length; i++) {
    totalQuantity = totalQuantity + product1[i].quantity;
  }
  res.status(200).json(totalQuantity);
});

module.exports = fetchTotalProducts;
