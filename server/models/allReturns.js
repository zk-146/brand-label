const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const returnSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },

    returnId: {
      type: "String",
      required: true,
    },

    products: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: { type: ObjectId, ref: "products" },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    address: { type: ObjectId, ref: "Address" },
    accountNumber: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("return", returnSchema);
