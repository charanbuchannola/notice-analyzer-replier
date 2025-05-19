const mongoose = require("mongoose");

const connect = () => {
  const uri = process.env.MONGODB_URI;
  console.log(uri);
  if (!uri) {
    console.error("MONGODB_URI not set in environment variables!");
    process.exit(1);
  }
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
};

module.exports = connect;
