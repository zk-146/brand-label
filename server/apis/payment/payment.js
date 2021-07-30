const initRazorpay = require("../../helpers/initRazorPay");
const get_cookies = require("../../helpers/getCookies");
const jwt = require("jsonwebtoken");
const Cart = require("../../models/dbCart");
const request = require("request");
const Orders = require("../../models/allOrders");

const payment = (req, res) => {
  switch (req.method) {
    case "POST":
      paymentCapture(req, res);
      break;
    case "GET":
      getPayment(req, res);
      break;
  }
};

const getPayment = (req, res) => {
  try {
    const getCart = async () => {
      const authorization = get_cookies(req).token;
      let total = 0;
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      const cart = await Cart.findOne({ user: userId }).populate(
        "products.product"
      );
      for (let i = 0; i < cart.products.length; i++) {
        total =
          total +
          cart.products[i].quantity * cart.products[i].product.sellingPrice;
      }
      const options = {
        amount: total * 100,
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 0,
      };
      initRazorpay.orders.create(options, async (err, order) => {
        if (err) {
          return res.status(500).json({
            message: "Something went wrong",
          });
        }
        return res.status(200).json(order);
      });
    };
    getCart();
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

const paymentCapture = (req, res) => {
  try {
    let cart1 = [];
    async function getTotal() {
      let total1 = 0;
      const authorization = get_cookies(req).token;
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
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
      capturePayment(total1, userId, cart1);

      for (let i = 0; i < cart.products.length; i++) {
        cart1.push({
          quantity: cart.products[i].quantity,
          product: cart.products[i].product,
          price: cart.products[i].product.sellingPrice,
        });
      }
      cart1 = { products: cart1 };
    }

    getTotal();

    const capturePayment = (total1, userId, cart1) => {
      let addressId = get_cookies(req).addressId;
      try {
        addressId = JSON.parse(decodeURI(addressId));
      } catch (err) {
        console.log("IGNORE", err, "IGNORE");
      }
      return request(
        {
          method: "POST",
          url: `https://${process.env.RAZOR_KEY_ID}:${process.env.RAZOR_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
          form: {
            amount: total1 * 100,
            currency: "INR",
          },
        },
        async (err, response, body) => {
          if (err) {
            return res.status(500).json({
              message: "Something Went Wrong",
            });
          }
          const placeOrder = await new Orders({
            address: addressId,
            orderId: "It will be assigned after some while",
            user: userId,
            email: JSON.parse(body.split(",")).email,
            total: total1,
            products: cart1,
            paymentType: "prepaid",
            status: "In Transit",
          }).save();

          placeOrder.populate("products.product").populate("address");

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

          return res.status(200).json({ order: placeOrder });
        }
      );
    };
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};
module.exports = payment;
