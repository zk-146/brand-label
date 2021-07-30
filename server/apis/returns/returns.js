const get_cookies = require("../../helpers/getCookies");
const jwt = require("jsonwebtoken");
const Cart = require("../../models/dbCart");
const Orders = require("../../models/allOrders");
const User = require("../../models/dbUser");
const Authenticated = require("../../helpers/Authenticated");
const Returns = require("../../models/allReturns");
const initDB = require("../../helpers/initDB");

const returns = Authenticated(async (req, res) => {
  const authorization = get_cookies(req).token;
  const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

  const returns = await Returns.find({ user: userId })
    .populate("products.product")
    .populate("address");

  res.status(200).json(returns);
});

module.exports = returns;
