const Razorpay = require('razorpay');
const crypto = require("crypto");
const { response } = require('express');


const checkout = async (req, res) => {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_SECRET_API,
    });

    const options = {
        amount:Number(req.body.orderAmount * 100),  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    const order = await instance.orders.create(options);

    // console.log(order);
    res.status(200).json({
        success:true,
        order,
    })
}


const paymentVerification = async (req, res) => {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    // console.log(req.body);
    const body = razorpay_order_id +"|"+razorpay_payment_id;
    
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_API)
                                     .update(body.toString())
                                     .digest('hex');
    // console.log("sig recieved", razorpay_signature);
    // console.log("sig generated"+expectedSignature);

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){

        //Database comes here

        
       res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
    }else{
         res.status(200).json({
          success:false,
    })
    }

   
}

module.exports = {
    checkout,
    paymentVerification,
};