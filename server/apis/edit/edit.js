const Authenticated = require("../../helpers/Authenticated");
const get_cookies = require("../../helpers/getCookies");
const initDB = require("../../helpers/initDB");
const Product = require("../../models/dbProduct");
const User = require("../../models/dbUser");
const jwt = require("jsonwebtoken");

initDB();

const edit = async (req, res) => {
  const authorization = get_cookies(req).token;
  const {
    productType,
    pid,
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

  let materialType = req.body.materialType;
  let style = req.body.style;
  let displayProduct = req.body.displayProduct;

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

  const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

  const user = await User.findOne({ _id: userId });
  const userAdmin = user.role;
  if (userAdmin) {
    const product = await Product.findOneAndUpdate(
      { _id: pid },
      {
        $set: {
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
        },
      }
    );
  }
  res.status(200).send();
};

module.exports = edit;
