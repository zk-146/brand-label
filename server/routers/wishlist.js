const express = require("express");
const router = new express.Router();
const Authenticated = require("../helpers/Authenticated");
const Wishlist = require("../models/dbWishlist");

router.post(
  "/wishlist",
  Authenticated(async (req, res) => {
    const userId = req.body.userId;
    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products.product"
    );
    res.status(200).json(wishlist.products);
  })
);
router.put(
  "/wishlist",
  Authenticated(async (req, res) => {
    const { quantity, productId } = req.body;

    const wishlist = await Wishlist.findOne({ user: req.body.userId });
    const pExists = wishlist.products.some(
      (pdoc) => productId === pdoc.product.toString()
    );

    if (pExists) {
      await Wishlist.findOneAndUpdate(
        {
          _id: wishlist.id,
          "products.product": productId,
        },
        { $inc: { "products.$.quantity": quantity } }
      );
    } else {
      const newProduct = {
        quantity,
        product: productId,
      };
      await Wishlist.findOneAndUpdate(
        { _id: wishlist._id },
        { $push: { products: newProduct } }
      );
    }
    res.status(200).json({ message: "product added to wishlist" });
  })
);
router.delete(
  "/wishlist",
  Authenticated(async (req, res) => {
    const { productId, userId } = req.body;
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate("products.product");
    res.status(200).json(wishlist.products);
  })
);

module.exports = router;
