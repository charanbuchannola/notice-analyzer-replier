const mongoose = require("mongoose");

const connect = () => {
  const uri =
    "mongodb+srv://buchannolacharan:WMCRmAknvFFY6F8Q@cluster0.olj9y.mongodb.net/notice_analyzer";
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
