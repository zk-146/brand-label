const express = require("express");
const Authenticated = require("../helpers/Authenticated");
const router = new express.Router();
const User = require("../models/dbUser");
const Airpod = require("../models/allAirpod");
const SmartWatch = require("../models/allSmartWatch");
const Mobile = require("../models/allMobile");
const TemperedGlass = require("../models/allTemperedGlass");
const get_cookies = require("../helpers/getCookies");
const jwt = require("jsonwebtoken");

router.get(
  "/addbrands",
  Authenticated(async (req, res) => {
    console.log("HERE 1");
    let { productType } = req.query;
    const authorization = get_cookies(req).token;
    try {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      const userAdmin = await User.find({
        _id: userId,
      });

      console.log(userAdmin + " " + userId);

      if (userAdmin[0].role === "admin") {
        if (productType === "Mobile Cover") {
          const res2 = await Mobile.find({});
          return res.status(200).send(res2);
        } else if (productType === "Airpod Cases") {
          const res2 = await Airpod.find({});
          return res.status(200).send(res2);
        } else if (productType === "Smart Watch") {
          const res2 = await SmartWatch.find({});
          return res.status(200).send(res2);
        } else if (productType === "Tempered Glass") {
          const res2 = await TemperedGlass.find({});
          return res.status(200).send(res2);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({ error: err });
    }
  })
);

router.post(
  "/addbrands",
  Authenticated(async (req, res) => {
    const productType = req.body.productType;
    const brand = req.body.brand;
    const name = req.body.productName;
    const authorization = get_cookies(req).token;
    try {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      const userAdmin = await User.find({
        _id: userId,
      });

      if (userAdmin[0].role === "admin") {
        if (productType === "Mobile Covers") {
          await new Mobile({
            brand,
            name,
          })
            .save()
            .then((res2) => {
              return res.status(200).send(res2);
            });
        } else if (productType === "Airpod Cases") {
          await new Airpod({
            brand,
            name,
          })
            .save()
            .then((res2) => {
              return res.status(200).send(res2);
            });
        } else if (productType === "Smart Watch") {
          await new SmartWatch({
            brand,
            name,
          })
            .save()
            .then((res2) => {
              return res.status(200).send(res2);
            });
        } else if (productType === "Tempered Glass") {
          await new TemperedGlass({
            brand,
            name,
          })
            .save()
            .then((res2) => {
              return res.status(200).send(res2);
            });
        }
        // else if  (productType === "Tempered Glass") {
        //   await new Mobile({
        //     brand,
        //     name,
        //   })
        //     .save()
        //     .then((res2) => {
        //       res.status(200).send(res2);
        //     });
        // }
      }
    } catch (err) {
      console.log(err);
      res.status(422).json({ error: err });
    }
  })
);

module.exports = router;
