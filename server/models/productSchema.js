const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    title: {
      type:String,
      required:true,
    },
    mrp:{
      type: Number,
      required:true,
    },
    price: {
      type: Number,
      required:true,
    },
    discount: {
      type: Number,
      required:true,
    },
    S_stock: {
      type: Number,
    },
    M_stock: {
      type: Number,
    },
    L_stock: {
      type: Number,
    },
    XL_stock: {
      type: Number,
    },
    XXL_stock: {
      type: Number,
    },
    category: {
      type:String,
      required:true,
    },
    description: {
      type:String,
      required:true,
    },
    images:[String],
    fabric:String,
    sleeveLength:String,
    pattern:String,
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Products", productSchema);