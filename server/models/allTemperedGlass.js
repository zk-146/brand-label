const mongoose = require("mongoose");

const temperedGlassSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tempered", temperedGlassSchema);
