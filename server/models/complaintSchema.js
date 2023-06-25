const mongoose = require("mongoose"); // Erase if already required

const complaintSchema = new mongoose.Schema(
{
    id:String,
    name:String,
    number:Number,
    orderId:Number,
    complaint:String,
    resolved:Boolean,
},
{ timestamps: true }
);


module.exports = mongoose.model("Complaints", complaintSchema);