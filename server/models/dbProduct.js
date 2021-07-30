const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  materialType: {
    type: String,
  },
  style: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  mediaUrl1: {
    type: String,
    required: true,
  },
  mediaUrl2: {
    type: String,
    required: true,
  },
  mediaUrl3: {
    type: String,
    required: true,
  },
  mediaUrl4: {
    type: String,
    required: true,
  },
  mediaUrl5: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  displayPage: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("products", productsSchema);
