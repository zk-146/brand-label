const mongoose = require("mongoose");
require("dotenv").config({ path: "dev.env.local" });

function initDB() {
  if (mongoose.connection.readyState) {
    console.log("Already Connected");
    return;
  }
  mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to Mongo");
  });
  mongoose.connection.on("error", () => {
    console.log("Error connecting");
  });
}

module.exports = initDB;
