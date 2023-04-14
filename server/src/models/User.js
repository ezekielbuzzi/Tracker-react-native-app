const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const useSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

useSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

useSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return reject({ message: "Wrong email or password" });
      }

      if (!isMatch) {
        return reject({ message: "Wrong email or password" });
      }

      resolve(true);
    });
  });
};

module.exports = mongoose.model("User", useSchema);
