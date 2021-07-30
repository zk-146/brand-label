const mongoose = require("mongoose");

const airpodSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("airpod", airpodSchema);
