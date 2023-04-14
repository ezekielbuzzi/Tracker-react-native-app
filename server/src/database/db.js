const mongoose = require("mongoose");

const db = () => {
  const mongoURI =
    "mongodb+srv://ezekiel:7wT76hZlZEll0g6b@cluster0.urt9lsm.mongodb.net/Tracker?retryWrites=true&w=majority";

  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Connection to database successfull".yellow);
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};

module.exports = db;
