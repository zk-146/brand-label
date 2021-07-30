const Authenticated = require("../../helpers/Authenticated");
const initDB = require("../../helpers/initDB");
const User = require("../../models/dbUser");

initDB();

async function profile(req, res) {
  switch (req.method) {
    case "POST":
      await fetchProfileDetails(req, res);
      break;
    case "PATCH":
      await updateUserDetails(req, res);
      break;
  }
}

const fetchProfileDetails = Authenticated(async (req, res) => {
  try {
    const userId = req.body.userId;
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
});

const updateUserDetails = Authenticated(async (req, res) => {
  try {
    const userId = req.body.userId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    if (lastName === undefined) {
      const updateFirstName = await User.findOneAndUpdate(
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
      const updateLastName = await User.findOneAndUpdate(
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
});

module.exports = profile;
