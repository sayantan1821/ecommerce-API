const express = require("express");
const connectDB = require("./Database/db");
const bodyParser = require("body-parser");
const app = express();
const auth = require("./routes/api/auth");
const products = require("./routes/api/products");
const cart = require("./routes/api/cart");
const order = require("./routes/api/order")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const importData = require("./Database/importData");
connectDB();

// importData();
app.use("/api/auth", auth);
app.use("/api/products", products);
app.use("/api/cart", cart);
app.use("/api/order", order);
// app.use("/", (req, res) => {
//   res.send("API is running");
// });
let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
