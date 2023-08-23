const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth")

const User = require("../../models/User")
const Product = require("../../models/Product")
router.get(
  '/getUserCartDetails',
  auth,
  async (req, res) => {
    try {
      let cartItems = await User.findOne({_id : req.user._id}).cart;

      if (cartItems) {
        return res.json(cartItems);
      }
      res.status(404).send('No cartItems Found');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
// router.get(
//   '/getProducts',
//   auth,
//   async (req, res) => {
//     try {
//       let products = await Product.find({});

//       if (products) {
//         return res.json(products);
//       }
//       res.status(404).send('No products Found');
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

// router.get(
//   '/getProductById',
//   auth,
//   async (req, res) => {
//     try {
//       let product = await Product.find(req.body);

//       if (product) {
//         return res.json(product);
//       }
//       res.status(404).send('No product Found');
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

module.exports = router;
