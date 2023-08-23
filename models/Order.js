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
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalCost: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model("order", OrderSchema);
