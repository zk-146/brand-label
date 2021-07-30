const mongoose = require("mongoose");

const smartWatchSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("smartWatch", smartWatchSchema);
