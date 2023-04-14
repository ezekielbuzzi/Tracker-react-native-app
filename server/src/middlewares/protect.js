const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.send("You must login to get access 1");
  }

  const token = authorization.slice(7);

  jwt.verify(token, "MY_SECRET", async (err, payload) => {
    if (err) {
      return res.send("You must login to get access");
    }

    const { id } = payload;

    const user = await User.findById(id);

    req.user = user;
    next();
  });
};

module.exports = protect;
