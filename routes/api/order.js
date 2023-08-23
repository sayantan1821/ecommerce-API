const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Product = require("../../models/Product");
const Order = require("../../models/Order");

router.post("/placeOrder", auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    if (user) {
      if (user.cart.length > 0) {
        let order = new Order({
          user: user._id,
          products: user.cart,
          totalCost: 1000,
        });
        let result = await order.save();
        user.cart = [];
        await user.save();
        return res.json(result);
      } else {
        return res.status(404).send("No Items Found in cart");
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let order = await Order.find({user: req.user.id});
    if (order) {
      return res.status(200).json(order);
    } else return res.status(404).send("Orders Not Found");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/getOrderById", async (req, res) => {
    try {
      let order = await Order.findOne(req.body);
      if (order) {
        return res.status(200).json(order);
      } else return res.status(404).send("Orders Not Found");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
module.exports = router;
