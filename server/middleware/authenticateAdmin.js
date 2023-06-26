const jwt = require("jsonwebtoken");
const Admin = require("../models/adminSchema");
const secretKey = process.env.KEY;

const authenticateadmin = async(req,res,next) => {
  try{
     const token = req.cookies.admintanot;

     const verifyToken = jwt.verify(token,secretKey);
    //  console.log(verifyToken);

     const rootUser = await Admin.findOne({_id:verifyToken._id,"tokens.token":token});
    //  console.log(rootUser);

     if(!rootUser){throw new Error("user not found")};

    //  req.token = token
    //  req.rootUser = rootUser
     req.userID = rootUser._id

     next();
  }catch(error){
    res.status(401).send("unautherized: token provided")
    console.log(error);
  }
}
module.exports = authenticateadmin;