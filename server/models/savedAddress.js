const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const savedAddressSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  addresses: [
    {
      address: {
        type: ObjectId,
        ref: "Address",
      },
    },
  ],
});

module.exports = mongoose.model("savedAddress", savedAddressSchema);
