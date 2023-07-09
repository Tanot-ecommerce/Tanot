const express = require('express');
const {checkout,paymentVerification} = require("../controller/paymentController");
const authenticate = require("../middleware/authenticate")


const payRouter = express.Router();
payRouter.route("/checkout").post(checkout);
payRouter.route("/paymentverification").post(authenticate,paymentVerification)

module.exports = payRouter;