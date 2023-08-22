const Category = require("../models/Category");
const Product = require("../models/Product");
const Order = require("../models/Order")
const importData = async () => {
  try {
    // let category = new Category({name : "Watches"});
    // await category.save();

    // let product = new Product({
    //   name: "Timex",
    //   category: "64e51c123874c35b85d5a329",
    // });
    // await product.save();
    let order = new Order({
        user : "64e518ff86b39641ee6ee39b",
        products: ["64e51dccfeb6b41379be5084", "64e51fe4b446c45f1ba3a2f9", "64e51fcd034cffd9c2fbb150"]
    })
    await order.save()
    console.log("data imported");
  } catch (err) {
    console.log(err);
  }
};
module.exports = importData;
