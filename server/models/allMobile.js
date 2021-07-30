const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("mobile", mobileSchema);
