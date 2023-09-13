const mongoose = require("mongoose"); // Erase if already required

const AllOrdertSchema = new mongoose.Schema(
{
    orderId:String,
    //this is _id of user
    userId:{
      type: mongoose.Schema.Types.ObjectId,
       ref: 'USER',
    },
    orderAmount:Number,
    orderedAt:String,
    shippedAt:String,
    deliveredAt:String,
    productIds: [{
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Products',
    }],
    status:String,
    price:Array,
    size:Array,
    quantity:Array,
    payment:String,
    address:{
     name:String,
     phone:Number,
     landmart:String,
     city:String,
     pincode:Number,
     state:String,
    },
    rzpOrderId:String,
    rzpPaymentId:String,
},
{ timestamps: true }
);


module.exports = mongoose.model("AllOrders", AllOrdertSchema);