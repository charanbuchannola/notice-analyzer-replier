require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

app.get("/", (req, res) => res.send("Notice Analyzer API Running"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
