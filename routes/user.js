const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/UserModel");
const {SignUPController,LoginController,forgetPassword,isUsernameExist} =require('../Controller/UserController');
const {signupValidation,LoginValidation} =require('../validation/FormValidation');


// 

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
// check().notEmpty()
router.post("/signup",
signupValidation(check),
SignUPController);

router.get('/username',[
check("username", "Please Enter a Valid Username")
.not()
.isEmpty().notEmpty()
],isUsernameExist);

router.post(
  "/login",
  LoginValidation(check),
  LoginController,
);

router.put('/forgetpassword',
check("email", "Please enter a valid email").isEmail().notEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    }).notEmpty()
,forgetPassword)

router.get('/logout',auth,(req,res)=>{
  res.clearCookie('token');
  res.redirect('/')
})

router.get("/dashboard", auth, async (req, res) => {
  try {
    console.log(req.userid);
    const user = await User.findOne({email:req.userid.toLowerCase()});
    
    res.json(user);
    // console.log(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
