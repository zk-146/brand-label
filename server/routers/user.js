const express = require("express");
const router = new express.Router();
const Cart = require("../models/dbCart");
const Wishlist = require("../models/dbWishlist");
const Isemail = require("isemail");
const Address = require("../models/savedAddress");
const User = require("../models/dbUser");
const Authenticated = require("../helpers/Authenticated");
const bcrypt = require("bcryptjs");
const address = require("../apis/address/address");

router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    mobile,
    gender,
  } = req.body;

  const options = ["Male", "Female", "Other"];
  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile ||
      !gender
    ) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    if (!Isemail.validate(email)) {
      return res.status(422).json({ error: "Invalid Email" });
    }
    if (firstName === "") {
      return res.status(422).json({ error: "First Name is required" });
    }

    if (lastName === "") {
      return res.status(422).json({ error: "Last Name is required" });
    }

    if (email === "") {
      return res.status(422).json({ error: "Email is required" });
    }
    if (password === "") {
      return res.status(422).json({ error: "Password is required" });
    }
    if (confirmPassword === "") {
      return res.status(422).json({ error: "Confrim Password is required" });
    }
    if (mobile === "") {
      return res.status(422).json({ error: "Mobile Number is required" });
    }
    if (gender === "") {
      return res.status(422).json({ error: "Gender is required" });
    }

    if (password.length < 6) {
      return res.status(422).json({ error: "Password is too short" });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ error: "Passwords dont match" });
    }

    if (mobile.trim().length < 13) {
      return res
        .status(422)
        .json({ error: "Please enter a 10 digit mobile number" });
    }

    if (!options.includes(gender)) {
      return res
        .status(422)
        .json({ error: "Please enter a 10 digit mobile number" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ error: "User already exists!" });
    }

    const newUser = await new User({
      firstName,
      lastName,
      email,
      password,
      mobile,
      gender,
      role: "user",
    }).save();
    await new Cart({ user: newUser._id }).save();
    await new Wishlist({ user: newUser._id }).save();
    await new Address({ user: newUser._id }).save();
    let newUserData = { ...newUser }._doc;
    delete newUserData.password;
    delete newUserData.createdAt;
    delete newUserData.updatedAt;
    return res.status(201).json(newUserData);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const emailId = req.body.email;
    if (!emailId || !password) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    const user = await User.findByCredentials(emailId, password);
    const token = await user.generateAuthToken();

    const { _id, firstName, lastName, email, mobile, gender, role } = user;
    const userData = {
      _id,
      firstName,
      lastName,
      email,
      mobile,
      gender,
      role,
    };

    res.cookie("token", token, {
      sameSite: "lax",
      path: "/",
      expires: new Date(new Date().getTime() + 604800 * 1000),
      httpOnly: true,
    });
    res.cookie("user", JSON.stringify(userData), {
      expires: new Date(new Date().getTime() + 604800 * 1000),
    });
    res.cookie("isAuth", true, {
      expires: new Date(new Date().getTime() + 604800 * 1000),
    });

    return res.send();
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
});

router.post("/logout", (req, res) => {
  return res.status(200).clearCookie("token").send("Token removed");
});

//--ACCOUNT PAGE--
router.post(
  "/user/profile",
  Authenticated(async (req, res) => {
    try {
      const { userId } = req.body;
      const userData = await User.findOne({ _id: userId });
      let sendUserData = { ...userData }._doc;
      delete sendUserData.password;
      delete sendUserData.createdAt;
      delete sendUserData.updatedAt;
      delete sendUserData._id;
      return res.status(200).json(sendUserData);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
  })
);

router.patch(
  "/user/profile",
  Authenticated(async (req, res) => {
    try {
      const userId = req.body.userId;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      if (lastName === undefined) {
        await User.findOneAndUpdate(
          { _id: userId },
          { $set: { firstName: firstName } },
          (err, data) => {
            if (err) {
              res.status(500).send({ error: err });
            } else {
              let userFirstName = data.firstName;
              res.status(200).json(userFirstName);
            }
          }
        );
      } else if (firstName === undefined) {
        await User.findOneAndUpdate(
          { _id: userId },
          { $set: { lastName: lastName } },
          (err, data) => {
            if (err) {
              res.status(500).send({ error: err });
            } else {
              let userLastName = data.lastName;
              res.status(200).json(userLastName);
            }
          }
        );
      } else if (firstName === "" || lastName === "") {
        res.status(400).send({ error: "Update field is empty" });
      } else if (firstName === undefined && lastName === undefined) {
        res.status(400).send({ error: "Update field is undefined" });
      }
    } catch (err) {
      res.status(500).send({ error: err });
    }
  })
);
//---------------

//--Change Password--
router.patch(
  "/user/profile/changepassword",
  Authenticated(async (req, res) => {
    const userId = req.body.userId;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.password;
    const userData = await User.findOne({ _id: userId }, async (err, data) => {
      if (err) {
        res.status(500).send({ error: err });
      }
    });

    const userPasswordHash = userData.password;
    const doMatch = await bcrypt.compare(oldPassword, userPasswordHash);
    if (!doMatch) {
      res.status(400).json({ message: "Incorrect Password" });
    } else {
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
      await User.findOneAndUpdate(
        { _id: userId },
        { $set: { password: hashedNewPassword } }
      );
      res.status(200).send({ message: "Password changed successfully" });
    }
  })
);
//---------------

// router.get("/save-address", (req, res) => {
//   address(req, res);
// });

// router.put("/save-address", (req, res) => {
//   address(req, res);
// });

// router.post("/save-address", (req, res) => {
//   address(req, res);
// });

module.exports = router;
