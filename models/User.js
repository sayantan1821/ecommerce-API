const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // orderHistory: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "order",
  //   },
  // ],
  cart: [
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
});

module.exports = mongoose.model("user", UserSchema);
