const express = require("express");
const Authenticated = require("../helpers/Authenticated");
const router = new express.Router();
const get_cookies = require("../helpers/getCookies");
const Cart = require("../models/dbCart");
const Returns = require("../models/allReturns");
const Orders = require("../models/allOrders");
const User = require("../models/dbUser");
const jwt = require("jsonwebtoken");

router.post(
  "/orderCod",
  Authenticated(async (req, res) => {
    try {
      let total1 = 0;
      const paymentType = req.body.paymentType;
      const authorization = get_cookies(req).token;
      let addressId = req.body.addressId;
      // let addressId = get_cookies(req).addressId;

      try {
        addressId = JSON.parse(decodeURI(addressId));
      } catch (err) {}

      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

      const user = await User.findById({
        _id: userId,
      });

      const cart = await Cart.findOne({ user: userId }).populate(
        "products.product"
      );

      if (cart.products.length === 0) {
        return res.status(400).send();
      }
      for (let i = 0; i < cart.products.length; i++) {
        total1 =
          total1 +
          JSON.parse(cart.products[i].quantity) *
            cart.products[i].product.sellingPrice;
      }

      let cart1 = [];

      for (let i = 0; i < cart.products.length; i++) {
        cart1.push({
          quantity: cart.products[i].quantity,
          product: cart.products[i].product,
          price: cart.products[i].product.sellingPrice,
        });
      }
      cart1 = { products: cart1 };

      const placeOrder = await new Orders({
        address: addressId,
        orderId: "It will be assigned after some while",
        user: userId,
        email: user.email,
        total: total1,
        products: cart1.products,
        paymentType: paymentType,
        status: "In Transit",
      }).save();

      await Cart.findOneAndUpdate(
        {
          user: userId,
        },
        {
          $set: { products: [] },
        }
      );
      res.clearCookie("addressId", { path: "/checkout" });
      res.clearCookie("addressId", { path: "/" });

      placeOrder.populate("products.product").populate("address");

      res.status(200).json({ order: placeOrder });
    } catch (err) {
      console.log("err", err);
      res.status(500).json({ error: err });
    }
  })
);

router.get(
  "/allOrders",
  Authenticated((req, res) => {
    try {
      const orders = async () => {
        const authorization = get_cookies(req).token;
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        const allOrders = await Orders.find({ user: userId })
          .populate("products.product")
          .populate("address");
        return res.status(200).json(allOrders);
      };
      orders();
    } catch (err) {
      console.log(err);
      return res.status(500).send({ err });
    }
  })
);

router.post(
  "/order/cancel",
  Authenticated(async (req, res) => {
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
  })
);

router.get(
  "/allReturns",
  Authenticated(async (req, res) => {
    const authorization = get_cookies(req).token;
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

    const returns = await Returns.find({ user: userId })
      .populate("products.product")
      .populate("address");

    res.status(200).json(returns);
  })
);

router.post(
  "/return",
  Authenticated(async (req, res) => {
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
  })
);

module.exports = router;
