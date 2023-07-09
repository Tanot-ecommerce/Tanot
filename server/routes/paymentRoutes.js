// const express = require("express");
// const router = express.Router();
// const Razorpay = require("razorpay");

// // Create a new instance of Razorpay
// const razorpay = new Razorpay({
//     key_id: "rzp_test_RwaGmyvViXj4UI",
//     key_secret: "IvUJVYWqVLXwpvJjPBoPABTh",
// });

// // Route for creating an order
// router.post("/create-order", async (req, res) => {
//     try {
//         const { amount, currency, receipt } = req.body;

//         // Create the order on the Razorpay server
//         const order = await razorpay.orders.create({
//             amount: amount * 100, // Amount in paise (multiply by 100)
//             currency,
//             receipt,
//         });

//         // Return the order ID to the client
//         res.json({ orderId: order.id });
//     } catch (error) {
//         console.error("Error creating order:", error);
//         res.status(500).json({ error: "Failed to create order" });
//     }
// });

// // Route for verifying the payment
// router.post("/verify-payment", async (req, res) => {
//     try {
//         const { orderId, paymentId, signature } = req.body;

//         // Fetch the payment details from Razorpay
//         const payment = await razorpay.payments.fetch(paymentId);

//         // Verify the payment signature
//         const isValidSignature = razorpay.verifyPaymentSignature({
//             orderId,
//             paymentId,
//             signature,
//         });

//         if (payment && isValidSignature) {
//             res.json({ success: true });
//         } else {
//             res.json({ success: false });
//         }
//     } catch (error) {
//         console.error("Error verifying payment:", error);
//         res.status(500).json({ error: "Failed to verify payment" });
//     }
// });

// module.exports = router;
