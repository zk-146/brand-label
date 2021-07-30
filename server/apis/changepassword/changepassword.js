const initDB = require("../../helpers/initDB");
const User = require("../../models/dbUser");
const bcrypt = require("bcryptjs");
const Authenticated = require("../../helpers/Authenticated");

initDB();

// async function changepassword(req, res) {
const changepassword = Authenticated(async (req, res) => {
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
    const updateUserPassword = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { password: hashedNewPassword } }
    );
    res.status(200).send({ message: "Password changed successfully" });
  }
});

module.exports = changepassword;
