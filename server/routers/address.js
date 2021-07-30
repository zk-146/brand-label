const express = require("express");
const router = new express.Router();
const User = require("../models/dbUser");
const Authenticated = require("../helpers/Authenticated");
const get_cookies = require("../helpers/getCookies");
const jwt = require("jsonwebtoken");
const Address = require("../models/dbAddress");
const SavedAddress = require("../models/savedAddress");

router.get(
  "/save-address",
  Authenticated(async (req, res) => {
    try {
      const authorization = get_cookies(req).token;
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: userId });

      const userAddresses = await SavedAddress.findOne({
        user: user._id,
      }).populate("addresses.address");

      res.status(200).json(userAddresses);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  })
);

router.post(
  "/save-address",
  Authenticated(async (req, res) => {
    try {
      let address = req.body.addressId;
      try {
        address = JSON.parse(decodeURI(address));
      } catch (err) {
        console.log("INGORE", err, "IGNORE");
      }
      // let addressId = get_cookies(req).addressId;
      const checkAddress = await Address.findById(address);
      if (checkAddress !== null) res.status(200).json(true);
      else res.status(400).send({ err });
    } catch (err) {
      console.log(err);
      res.status(400).send({ err });
    }
  })
);

router.put(
  "/save-address",
  Authenticated(async (req, res) => {
    const authorization = get_cookies(req).token;
    const { name, phone, pincode, city, district, state } = req.body;
    let address = req.body.address;
    address = decodeURI(address);

    try {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      const user = await User.find({
        _id: userId,
      });

      const savedAddress = await SavedAddress.findOne({ user: userId });

      const sendAddress = await new Address({
        name,
        mobile: phone,
        address,
        pincode,
        city,
        district,
        state,
      }).save();

      const newAddress = { address: sendAddress._id };

      await SavedAddress.findOneAndUpdate(
        { _id: savedAddress._id },
        { $push: { addresses: newAddress } }
      );

      res.cookie("addressId", JSON.stringify(sendAddress._id), {
        expires: new Date(new Date().getTime() + 604800 * 1000),
      });
      res.status(201).json(sendAddress);
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "USER ID NOT FOUND" });
    }
  })
);

module.exports = router;
