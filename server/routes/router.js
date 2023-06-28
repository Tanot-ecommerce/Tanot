const express = require('express');
const router = new express.Router();
const Products = require('../models/productSchema')
const bcrypt = require("bcryptjs");
const USER = require('../models/userSchema');
const Orders = require('../models/orderSchema');
const Complaints = require('../models/complaintSchema');
const authenticate = require("../middleware/authenticate");
const authenticateadmin = require("../middleware/authenticateAdmin");
const Admin = require("../models/adminSchema")
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

//fetch all products
router.get('/getproducts', async (req, res) => {
  try {

    const productdata = await Products.find();
    //  console.log(productdata);
    // const size = await Products.countDocuments({})
    // console.log(size);
    res.status(201).json(productdata);
  } catch (error) {
    console.log("error" + error.message);
  }
})

//get product by collection
router.get('/collections/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = { category: id };

    // Use the find method to retrieve the data
    Products.find(query)
      .then(data => {
        // Process the retrieved data
        res.status(201).json(data);
      })
      .catch(error => {
        // Handle the error
        console.error("error " + error.message);
      });
    // console.log

  } catch (error) {
    console.log("error " + error.message);
  }
})

// get individual detail
router.get('/productdetail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const individualData = await Products.findOne({ _id: id });
    // console.log(individualDetail);
    res.status(201).json(individualData);
  } catch (error) {
    console.log("error" + error.message);
  }
});

//register data

router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    res.status(422).json({ error: "fill the all data" });
    console.log("no data available")
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "user already exist" });
    }
    else if (password !== cpassword) {
      res.status(422).json({ error: "passwords not matched" });
    } else if (password.length < 6) {
      res.status(422).json({ error: "password must include atleast 6 characters" })
    }
    else {
      const finaluser = new USER({
        name, email, password, cpassword
      });

      //password hashing process


      const storedata = await finaluser.save();
      // console.log(storedata);

      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log("Error " + error.message)
  }
})

//Login data
router.post("/login", async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill all data" })
  };

  try {


    const userLogin = await USER.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      //  console.log(isMatch);


      if (!isMatch) {
        res.status(400).json({ error: "Invalid credential" })
      }
      else {
        //token generate
        const token = await userLogin.generateAuthToken();
        // console.log(token);

        res.cookie("Tanotweb", token, {
          expires: new Date(Date.now() + 900000000),  //cookie expire in 15 min
          httpOnly: true
        })

        res.status(201).json(userLogin)
      }
    } else {
      res.status(400).json({ error: "user not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid details" })
  }
});

//adding items to cart
router.post("/addCart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ _id: id });
    const size = req.body.selectedButton;
    // console.log(size);
    //  console.log(cart + "cart value");
    // console.log(req.body);
    const userContact = await USER.findOne({ _id: req.userID });
    //  console.log(userContact);

    if (userContact) {
      const cartData = await userContact.addCartdata(cart,size);
      await userContact.save();
      // console.log(cartData);
      res.status(201).json(userContact);
    } else {
      res.status(401).json({ error: "invalid user" });
    }

  } catch (error) {
    res.status(401).json({ error: "invalid user" });
  }
})

//get cart details

router.get("/cart", authenticate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    res.status(201).json(buyuser);
  } catch (error) {
    console.log("error in cartitems" + error.message);
  }
})

//get valid user
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const vailduserone = await USER.findOne({ _id: req.userID });
    res.status(201).json(vailduserone);
  } catch (error) {
    console.log("error in cartitems" + error.message);
  }
})

//remove item from cart
router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((crval) => {
      return crval.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    // console.log("item remove");
  } catch (err) {
    console.log("error" + err);
    res.status(400).json(req.rootUser);
  }
})

//for user logout
router.get("/logout", authenticate, async (req, res) => {
  try {
    //remove all tokens
    req.rootUser.tokens.length = 0;

    res.clearCookie("Tanotweb", { path: "/" });

    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    console.log("user logout");
  } catch (error) {
    console.log("err for user logout");
  }
})

//to post complaint
router.post("/add/complaints", authenticate, async (req, res) => {
  try {
    const { id, name, number, orderId, complaint } = req.body;

    const finalComplaint = new Complaints({
      id, name, number, orderId, complaint
    });

    const storeComplaint = await finalComplaint.save();
    // console.log(storedata);
    // console.log(storeComplaint);
    res.status(201).json(storeComplaint);
  } catch (err) {
    console.log("Error " + err.message)
  }
})

// to place order
router.post("/place/order", authenticate, async (req, res) => {
  try {
    const { orderAmount, products, price, size, payment, name, phone, landmark, pincode, stat, city} = req.body;
  //  console.log(products);
  // console.log(payment);
    // Get the authenticated user
    const userId = req.rootUser._id;
    const productIds = products.map(idString => new mongoose.Types.ObjectId(idString));
    const orderId = uuidv4();
    const status = "placed";
    // console.log(orderId);
    console.log(productIds);

    //DD/MM/YYYY formate
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());
    const formattedDate = `${day}/${month}/${year}`;


    //set address object
    const address = {
      name:name,
      phone:phone,
      landmart:landmark,
      city:city,
      pincode:pincode,
      state:stat,
     };
    // Create a new order object
    const order = new Orders({
      orderId,
      userId,
      orderAmount,
      orderedAt: formattedDate,
      productIds,
      status,
      price,
      size,
      payment:payment,
      address,
    });
    // console.log("ok");

    //add the product to all order schema
    const placedOrders = await order.save();

    //remove all items from cart
    req.rootUser.carts = [];

    // Save the updated user object
    await req.rootUser.save();
    // console.log("ok");

    res.status(200).json(placedOrders);

  } catch (err) {
    console.log(err);
  }
})

//to fetch order list of user
router.get("/orders/:id",authenticate, async(req,res) =>{
  try{
    const {id} = req.params;
    const userOrders = await Orders.find({ userId: id }).exec()
    // console.log(userOrders);
    res.status(201).json(userOrders);
  }catch(err){
    console.log("error "+err);
  }
})

//to get detail of order
router.get("/order/:id",authenticate, async(req, res) =>{
  try{
    const {id}  = req.params;
    // console.log(id);
    const order = await Orders.findOne({ _id: id}).populate({
      path: "userId",
      select: "name email", // Specify the fields you want to include from the user document
    }).populate({
      path: "productIds", // Replace "anotherCollection" with the name of the collection you want to populate
      select: "title mrp price category S_stock M_stock L_stock XL_stock XXL_stock description", // Specify the fields you want to include from the anotherCollection document
    });
    res.status(201).json(order);
  }catch(err){
    console.log("error "+err);
  }
})













//for admin

//to login admin
router.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;
//  console.log(password);
  // console.log(email);
  if (!email || !password) {
    res.status(400).json({ error: "fill all data" })
  };

  try {


    const adminLogin = await Admin.findOne({ email: email });
    
    if (adminLogin) {
     
      const isMatch =await bcrypt.compare(password, adminLogin.password);
      //  console.log(isMatch);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credential" })
      }
      else {
        //token generate
        // console.log(email);
        const token = await adminLogin.generateAuthToken();
        // console.log(token);
      //  console.log(res);
        res.cookie("admintanot", token, {
          expires: new Date(Date.now() + 9000000000),  //cookie expire in 15 min
          httpOnly: true
        })
        // console.log(req.cookies);
        res.status(201).json(adminLogin)
      }
    } else {
      res.status(400).json({ error: "user not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid details" })
  }
});

//get valid admin
router.get("/validadmin", authenticateadmin, async (req, res) => {
  try {
    const vailduserone = await Admin.findOne({ _id: req.userID });
    res.status(201).json(vailduserone);
  } catch (error) {
    console.log("error in cartitems" + error.message);
  }
})

//to add the product

const upload = multer();


router.post("/products/add", upload.none(),authenticateadmin, async (req, res) => {
  // Access the form data sent from the frontend
  const title = req.body.title;
  const mrp = req.body.mrp;
  const price = req.body.price;
  const discount = req.body.discount;
  const S_stock = req.body.S_stock;
  const M_stock = req.body.M_stock;
  const L_stock = req.body.L_stock;
  const XL_stock = req.body.XL_stock;
  const XXL_stock = req.body.XXL_stock;
  const category = req.body.category;
  const description = req.body.description;
  const images = req.body.images;
  // console.log(images);
  // console.log(req.body.images);
  // console.log(title);
  // console.log(mrp);
  // console.log(price);
  // console.log(discount);
  // console.log(S_stock);
  // console.log(M_stock);
  // console.log(L_stock);
  // console.log(XL_stock);
  // console.log(XXL_stock);
  // console.log(description);
  // console.log(category);
  // console.log(req.body);

  try {
    if (!title || !mrp || !price || !discount || !S_stock || !M_stock || !L_stock || !XL_stock || !XXL_stock || !category || !description || !images) {
      res.status(422).json({ error: "fill the all data" });
      console.log("no data available")
    }

    const finalProduct = new Products({
      title, mrp, price, discount, S_stock, M_stock, L_stock, XL_stock, XXL_stock, category, description, images
    });

    const storedata = await finalProduct.save();
    // console.log(storedata);
    res.status(201).json(storedata);
  } catch (err) {
    console.log("Error " + err.message)
  }
})

//to fetch all users
router.get("/Allusers",authenticateadmin, async (req, res) => {
  try {

    const usersData = await USER.find();
    //  console.log(usersData);
    res.status(201).json(usersData);
  } catch (error) {
    console.log("error" + error.message);
  }
})

//to delete product from the site
router.delete("/deleteProduct/:id",authenticateadmin, async (req, res) => {
  try {
    const { id } = req.params;

    //deleting element by its id
    await Products.deleteOne({ _id: id });

    //req 204 is for req handled succussfully but no content to return.
    res.status(204).end();
    console.log("item remove");
  } catch (err) {
    console.log("error" + err);
  }
})

//get single product to edit
router.get("/products/edit/:id",authenticateadmin, async (req, res) => {
  try {
    const { id } = req.params;
    const productdata = await Products.findById(id);
    // console.log(productdata);

    res.status(201).json(productdata);
  } catch (err) {
    console.log("err" + err.message);
  }
});


//to update product
router.patch("/products/update/:id",authenticateadmin, upload.none(), async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const { title, mrp, price, discount, S_stock, M_stock, L_stock, XL_stock, XXL_stock, category, description, images } = req.body;
    // console.log(req.body.images);
    const result = await Products.updateOne(
      { _id: id },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log("err" + err.message);
  }
})

//fetch user by id
router.get("/adminuser/:id",authenticateadmin, async (req, res) => {
  try {
    const { id } = req.params;
    const individualData = await USER.findOne({ _id: id });
    res.status(201).json(individualData);
  } catch (error) {
    console.log("error" + error.message);
  }
})

//fetch complaints
router.get("/admin/complaints",authenticateadmin, async (req, res) => {
  try {
    const complaints = await Complaints.find();
    res.status(201).json(complaints);
  } catch (err) {
    console.log("ERR" + err.message);
  }
})

//to delete complaint
router.delete("/admin/complaint/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //deleting element by its id
    await Complaints.deleteOne({ _id: id });

    //req 204 is for req handled succussfully but no content to return.
    res.status(204).json({ message: 'Item removed' });
    //  console.log("item remove");
  } catch (err) {
    res.status(204).json({ message: 'Item removed' });
    console.log("err in removing complaint" + err)
  }
})

//to get all orders list 
router.get("/admin/Allorders",authenticateadmin, async (req, res) => {
  try {
    const allOrders = await Orders.find().populate({
      path: "userId",
      select: "name email", // Specify the fields you want to include from the user document
    });
    res.status(201).json(allOrders);
  } catch (err) {
    console.log(err);
  }
})

//to get a single order to update its status
router.get("/admin/order/:id",authenticateadmin, async (req, res) => {
  try {

    const { id } = req.params;
    const order = await Orders.findOne({ _id: id }).populate({
      path: "userId",
      select: "name email", // Specify the fields you want to include from the user document
    }).populate({
      path: "productIds", // Replace "anotherCollection" with the name of the collection you want to populate
      select: "title mrp price category S_stock M_stock L_stock XL_stock XXL_stock description", // Specify the fields you want to include from the anotherCollection document
    });
    res.status(201).json(order);

  } catch (err) {
    console.log("err" + err.message);
  }
})

//to update order status
router.patch("/admin/orders/:id",authenticateadmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, shippedAt, deliveredAt } = req.body;
    const updatedOrder = await Orders.findByIdAndUpdate(
      id,
      { status, shippedAt, deliveredAt },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/admin/orders/:id",authenticateadmin, async(req,res)=>{
  try{
    const { id } = req.params;

    //deleting element by its id
    await Orders.deleteOne({ _id: id });

    //req 204 is for req handled succussfully but no content to return.
    res.status(204).json({ message: 'Order removed' });;
    // console.log("item remove");
  }catch(err){
    console.log("error" + err);
  }
})

//to fetch order by userid for admin
router.get("/admin/orders/:id",authenticateadmin, async(req,res) =>{
  try{
    const {id} = req.params;
    const userOrders = await Orders.find({ userId: id }).exec();
    // console.log(userOrders);
    res.status(201).json(userOrders);
  }catch(err){
    console.log("error "+err);
  }
})


//to register admin
// router.post("/adminregister",async(req,res) =>{
//   const {email, password} = req.body;
// //  console.log(email);
//   try {
//     // const preuser = await USER.findOne({ email: email });

//       const finaluser = new Admin({
//          email, password
//       });

//       //password hashing process


//       const storedata = await finaluser.save();
//       // console.log(storedata);

//       res.status(201).json(storedata);
//   } catch (error) {
//     console.log("Error " + error.message)
//   }
// })

module.exports = router;