const mongoose = require("mongoose");

const productTypesSchema = new mongoose.Schema({
  product: { type: String, required: true },
  show: { type: Boolean, required: true },
});

module.exports = mongoose.model("productTypes", productTypesSchema);
