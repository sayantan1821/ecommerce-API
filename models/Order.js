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
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: {
        type: Number,
      },
    },
  ],
  totalCost: {
    type: Number,
  },
});

module.exports = mongoose.model("order", OrderSchema);
