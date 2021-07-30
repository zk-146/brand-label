const get_cookies = require("../../helpers/getCookies");
const jwt = require("jsonwebtoken");
const Cart = require("../../models/dbCart");
const Orders = require("../../models/allOrders");
const User = require("../../models/dbUser");
const Authenticated = require("../../helpers/Authenticated");
const Returns = require("../../models/allReturns");
const initDB = require("../../helpers/initDB");

initDB();

const returnOrder = Authenticated(async (req, res) => {
  const orderDetails = req.body.orderDetails;
  const orderId = orderDetails._id;
  const returnIds = req.body.returnIds1;
  const { accountNum, ifscCode } = req.body;

  let quantity = [];
  let price = [];
  let returnProductIds = [];

  const authorization = get_cookies(req).token;
  const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

  const orders = await Orders.findById({ _id: orderId });
  if (orders.status === "Delivered") {
    const orderProducts = orders.products;

    returnIds.forEach((returnId) => {
      orderProducts.map((data) => {
        if (JSON.stringify(data._id) !== JSON.stringify(returnId)) {
        } else {
          returnProductIds.push(data.product);
          quantity.push(data.quantity);
          price.push(data.price);
        }
      });
    });

    let products = [];

    quantity.map((data, index) => {
      products.push({
        product: returnProductIds[index],
        quantity: data,
        price: price[index],
      });
    });

    if (orders.status !== "Delivered") {
      return res
        .status(400)
        .send("Invalid Request. Product not delivered yet.");
    }

    await new Returns({
      user: userId,
      returnId: "It will be assigned in a while",
      products: products,
      address: orders.address,
      email: orders.email,
      status: "In Process",
      accountNumber: accountNum,
      ifscCode,
    }).save();

    await Orders.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        $set: { status: "Returned" },
      }
    );

    return res.status(200).json({ message: "Return initiated" });
  } else if (orders.status !== "Delivered") {
    return res.status(400).json({ err: "Product not delivered yet" });
  }
});

module.exports = returnOrder;
