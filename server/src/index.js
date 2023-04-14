require("colors");
const express = require("express");
const DB = require("./database/db");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");

DB();

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(trackRoutes);

app.listen(3000, () => {
  console.log("Application is running on port 3000".cyan);
});
