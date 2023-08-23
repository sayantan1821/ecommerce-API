const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Product = require("../../models/Product");
router.get("/getUserCartDetails", auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    if (user) {
      return res.json(user.cart);
    }
    res.status(404).send("No Items Found");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/addToCart", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let product = await Product.findOne({ _id: req.body.productId });
    let user = await User.findOne({ _id: req.user.id }).select('-password');
    if (user) {
      let itemIndex = user.cart.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = user.cart[itemIndex];
        productItem.quantity = quantity;
        productItem.price = product.price;
        user.cart[itemIndex] = productItem;
      } else {
        user.cart.push({ productId, quantity: quantity, price: product.price });
      }
      user.updateOne({ _id: req.user._id }, { $set: user.cart });
      let result = await user.save();
      return res.status(201).json(result);
    }
    res.status(404).send("User Not Found");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/removeFromCart", auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id }).select("-password");

    if (user) {
      let itemIndex = user.cart.findIndex(
        (p) => p.productId == req.body.productId
      );
      if (itemIndex > -1) {
        user.cart.splice(itemIndex, 1);
        user.updateOne({ _id: req.user._id }, { $set: user.cart });
        let result = await user.save();
        return res.status(201).json(result);
      } else {
        res.status(404).send("Product is missing in cart");
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
