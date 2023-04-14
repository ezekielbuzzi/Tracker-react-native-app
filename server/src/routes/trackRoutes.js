const express = require("express");
const Track = require("../models/Track");
const protect = require("../middlewares/protect");

const router = express.Router();

router.use(protect);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.status(200).json({
    status: "success",
    tracks,
  });
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res.status(422).send({
      status: "fail",
      message: "Please provide a name and a location",
    });
  }

  try {
    const track = await Track.create({ name, locations, userId: req.user._id });
    res.send({ status: "success", track });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

module.exports = router;
