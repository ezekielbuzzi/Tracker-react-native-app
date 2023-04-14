const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = require("../middlewares/protect");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);

    const token = jwt.sign({ id: user._id }, "MY_SECRET");

    if (user) {
      res.status(201).json({
        status: "success",
        token,
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      statu: "fail",
      message: "Please provide your email and password",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .send({ status: "fail", message: "Wrong email or password" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ id: user._id }, "MY_SECRET");
    res.status(201).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = router;
