// import jwt from "jsonwebtoken";
const Cart = require("../../models/dbCart");
const Authenticated = require("../../helpers/Authenticated");
const initDB = require("../../helpers/initDB");

initDB();

async function cart(req, res) {
  switch (req.method) {
    case "POST":
      await fetchUserCart(req, res);
      break;
    case "PUT":
      await addProduct(req, res);
      break;
    case "DELETE":
      await removeProduct(req, res);
      break;
  }
}

const fetchUserCart = Authenticated(async (req, res) => {
  const userId = req.body.userId;
  const cart = await Cart.findOne({ user: userId }).populate(
    "products.product"
  );
  res.status(200).json(cart.products);
});

const addProduct = Authenticated(async (req, res) => {
  const { quantity, productId } = req.body;

  const cart = await Cart.findOne({ user: req.body.userId });
  const pExists = cart.products.some(
    (pdoc) => productId === pdoc.product.toString()
  );

  if (pExists) {
    await Cart.findOneAndUpdate(
      {
        _id: cart.id,
        "products.product": productId,
      },
      { $set: { "products.$.quantity": quantity }, upsert: true }
    );
  } else {
    const newProduct = {
      quantity,
      product: productId,
    };
    await Cart.findOneAndUpdate(
      { _id: cart._id },
      { $push: { products: newProduct } }
    );
  }

  let userId = req.body.userId;
  let totalQuantity = 0;
  const totalProducts = await Cart.find({ user: userId });
  const product1 = totalProducts[0].products;
  for (let i = 0; i < product1.length; i++) {
    totalQuantity = totalQuantity + product1[i].quantity;
  }

  res.status(200).json(totalQuantity);
});

const removeProduct = Authenticated(async (req, res) => {
  const { productId, userId } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { products: { product: productId } } },
    { new: true }
  ).populate("products.product");

  let totalQuantity = 0;
  const totalProducts = await Cart.find({ user: userId });
  const product1 = totalProducts[0].products;
  for (let i = 0; i < product1.length; i++) {
    totalQuantity = totalQuantity + product1[i].quantity;
  }

  res.status(200).json({ cart: cart.products, totalQuantity });
});

module.exports = cart;
