const get_cookies = require("../../helpers/getCookies");
const jwt = require("jsonwebtoken");
const Cart = require("../../models/dbCart");
const Orders = require("../../models/allOrders");
const User = require("../../models/dbUser");
// const Address = require("../../models/dbAddress");

const orders = async (req, res) => {
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
};

module.exports = orders;
