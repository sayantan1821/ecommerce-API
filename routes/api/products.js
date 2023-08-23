const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth")

const Category = require("../../models/Category")
const Product = require("../../models/Product")
router.get(
  '/getCategories',
  auth,
  async (req, res) => {
    try {
      let categories = await Category.find({});

      if (categories) {
        return res.json(categories);
      }
      res.status(404).send('No Categories Found');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.get(
  '/getProducts',
  auth,
  async (req, res) => {
    try {
      let products = await Product.find({});

      if (products) {
        return res.json(products);
      }
      res.status(404).send('No products Found');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get(
  '/getProductById',
  auth,
  async (req, res) => {
    try {
      let product = await Product.find(req.body);

      if (product) {
        return res.json(product);
      }
      res.status(404).send('No product Found');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
