const Authenticated = require("../../helpers/Authenticated");
const get_cookies = require("../../helpers/getCookies");
const initDB = require("../../helpers/initDB");
const Product = require("../../models/dbProduct");
const User = require("../../models/dbUser");
const jwt = require("jsonwebtoken");
const Wishlist = require("../../models/dbWishlist");
const Cart = require("../../models/dbCart");

initDB();

async function product(req, res) {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "POST":
      await postProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
}

const getProduct = async (req, res) => {
  const { pid } = req.query;
  try {
    const product = await Product.findOne({ _id: pid });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ error: "Product not found!" });
  }
};

const deleteProduct = Authenticated(async (req, res) => {
  const { pid } = req.query;

  const authorization = get_cookies(req).token;
  const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

  try {
    const user = await User.findOne({ _id: userId });
    const userAdmin = user.role;
    if (userAdmin === "admin") {
      await Cart.updateMany(
        { products: { $elemMatch: { product: pid } } },
        { $pull: { products: { product: pid } } }
      );
      await Wishlist.updateMany(
        { products: { $elemMatch: { product: pid } } },
        { $pull: { products: { product: pid } } }
      );
      await Product.findByIdAndDelete({ _id: pid });
      return res.status(200).json({ message: "Product Deleted Successfully!" });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

const postProduct = Authenticated(async (req, res) => {
  const {
    productType,
    name,
    color,
    sellingPrice,
    mrp,
    description,
    mediaUrl1,
    mediaUrl2,
    mediaUrl3,
    mediaUrl4,
    mediaUrl5,
    brand,
    productName,
    quantity,
  } = req.body;

  const authorization = get_cookies(req).token;
  const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

  let displayProduct = req.body.displayProduct;

  let materialType = req.body.materialType;
  let style = req.body.style;

  if (materialType === undefined) {
    materialType = "";
  }
  if (style === undefined) {
    style = "";
  }
  if (displayProduct === undefined || displayProduct === "false") {
    displayProduct = false;
    // } else if (displayProduct === "true") displayProduct = true;
  } else displayProduct = true;
  // else if (displayProduct === "false") displayProduct = false;
  try {
    const userAdmin = await User.findOne({ _id: userId });
    if (userAdmin.role === "admin" || userAdmin.role === "root") {
      if (
        !productType ||
        !name ||
        !color ||
        !sellingPrice ||
        !description ||
        !mediaUrl1 ||
        !mediaUrl2 ||
        !mediaUrl3 ||
        !mediaUrl4 ||
        !mediaUrl5 ||
        !brand ||
        !productName ||
        !quantity
      ) {
        return res.status(422).json({
          error: "Please add all the fields",
          productType,
          name,
          color,
          sellingPrice,
          mrp,
          description,
          mediaUrl1,
          mediaUrl2,
          mediaUrl3,
          mediaUrl4,
          mediaUrl5,
          brand,
          productName,
          quantity,
        });
      }
    } else {
      return res
        .status(401)
        .json({ error: "You are not authorized to upload a product" });
    }
    const product = await new Product({
      productType,
      name,
      color,
      sellingPrice,
      mrp,
      description,
      mediaUrl1,
      mediaUrl2,
      mediaUrl3,
      mediaUrl4,
      mediaUrl5,
      brand,
      productName,
      materialType,
      style,
      quantity,
      displayPage: displayProduct,
    }).save();
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = product;
