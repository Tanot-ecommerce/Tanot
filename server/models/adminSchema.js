const mongoose = require("mongoose"); // Erase if already required
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.KEY;

const adminSchema = new mongoose.Schema(
{
    email:String,
    password:String,
    tokens : [
        {
            token : {
                type:String,
                required:true
            }
        }
    ],
},

);

//Export the model
adminSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
    }
   
    next();
})


//token generate process
adminSchema.methods.generateAuthToken = async function(){
  try{
    let token = jwt.sign({_id:this._id},secretKey);
    this.tokens = [{token: token}];
    await this.save();
    return token;
  }catch(error){
    console.log(error);
  }
}

module.exports = mongoose.model("Admin", adminSchema);