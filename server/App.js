require("dotenv").config()
const express = require('express');
const app = express();
require("./db/connection");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
// const Products = require('./models/productSchema');

// const DefaultData = require("./DefaultData")
const cors = require('cors');
const router = require('./routes/router')
const payRouter = require("./routes/paymentRoute")

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.use(payRouter);
const port = 8005;




app.get("/", ()=>{
    console.log(`got request at path / ${port}`);
});
app.listen(port, () =>{
    console.log(`server is running at port ${port}`);
})

// DefaultData();