const jwt = require("jsonwebtoken");
const get_cookies = require("./getCookies");

function Authenticated(icomponent) {
  return (req, res) => {
    const authorization = get_cookies(req).token;
    if (!authorization) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    try {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      req.userId = userId;
      return icomponent(req, res);
    } catch (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }
  };
}

module.exports = Authenticated;
