const get_cookies = require("../../helpers/getCookies");
const jwt = require("jsonwebtoken");
const Cart = require("../../models/dbCart");
const Orders = require("../../models/allOrders");
const User = require("../../models/dbUser");
const Authenticated = require("../../helpers/Authenticated");

const cancelOrder = Authenticated(async (req, res) => {
  try {
    const orderId = req.body.orderId;

    const orderStatus = await Orders.findById({ _id: orderId });

    if (orderStatus.status === "In Transit") {
      const orderUpdate = await Orders.findByIdAndUpdate(
        { _id: orderId },
        {
          $set: { status: "Cancelled" },
        }
      );
      return res.status(201).send({ orderUpdate });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
});

module.exports = cancelOrder;
