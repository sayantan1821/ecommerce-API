const express = require("express");
const connectDB = require("./Database/db");
const bodyParser = require("body-parser");
const app = express();
const auth = require("./routes/api/auth");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const importData = require("./Database/importData")
connectDB();

// importData();
app.use("/api", auth);

// app.use("/", (req, res) => {
//   res.send("API is running");
// });

app.listen(1821, () => {
  console.log("server is running on PORT 1821");
});
