const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },

    orderId: {
      type: "String",
      required: true,
    },

    paymentType: {
      type: String,
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

    email: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
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

module.exports = mongoose.model("order", orderSchema);
