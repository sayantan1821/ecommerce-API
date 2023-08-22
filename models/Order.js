const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
  }]
});

module.exports = mongoose.model("order", OrderSchema);
