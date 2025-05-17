const express = require("express");
const app = express();
const cors = require("cors");
const noticeRoutes = require("./routes/noticeRoutes");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/api/notices", noticeRoutes);

module.exports = app;
