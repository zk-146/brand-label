const initDB = require("../../helpers/initDB");
const Product = require("../../models/dbProduct");

initDB();

async function product(req, res) {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
  }
}

const getProduct = async (req, res) => {
  const { name } = req.query;
  const product = await Product.find({ name: name });
  return res.status(200).json(product);
};

module.exports = product;
