const Razorpay = require("razorpay");
require("dotenv").config({ path: "dev.env.local" });

const initRazorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

module.exports = initRazorpay;
