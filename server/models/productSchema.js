const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    title: String,
    mrp: Number,
    price: Number,
    discount: Number,
    S_stock: Number,
    M_stock: Number,
    L_stock: Number,
    XL_stock: Number,
    XXL_stock: Number,
    category: String,
    description: String,
    images:[String],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Products", productSchema);