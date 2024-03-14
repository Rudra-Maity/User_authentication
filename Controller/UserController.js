const {validationResult} =require('express-validator');
const bcrypt=require('bcryptjs');

const User=require('../models/UserModel')
const user_auth=require('../config/user_auth')

const SignUPController= async (req, res) => {
//console.log(user_auth.jwtDecode(req.cookies.token));    
 if(user_auth.jwtDecode(req.cookies.token)===false){
    // req.url.toLocaleLowerCase()
    let user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { username, email, password } = req.body;
    // const upass = await Userpass(req.body.upass)
    // 'r'.toLowerCase()
    user = new User({
        username,
        email:email.toLowerCase() ,
        password

    })
    const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
       user .save()
        .then((result) => {
            const farFuture = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365));
            const jwt = user_auth.jwtSign(email, '1y')
            // console.log(jwt)
            res.cookie('token', jwt, { expires: farFuture, httpOnly: true, secure: true })
            console.log(result);
            const redir= req.session.prev || '/'
            res.redirect(redir);
            // delete req.session.prev
        })
        .catch((err) => {
            if (err.code === 11000) { res.send("email or username already exist") }
            else {
                console.log(err)
                res.status(500).json({
                    error: err,
                    succed: false
                });
            }
        });
    }else res.json({
        message: 'You are already logged in'
    })

}

const LoginController=async function(req,res){
// console.log(user_auth.jwtDecode(req.cookies.token));    
    if(user_auth.jwtDecode(req.cookies.token)===false){
        console.log('kmkjm');
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { username, password } = req.body;
    try {
        
      let user = await User.findOne({
        username 
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });
    // console.log(doc)
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        let ad=  user_auth.jwtSign(user.email,'1y')
        console.log('ad',ad)
        const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
        res.cookie('token', ad, { maxAge: oneYearInMilliseconds, httpOnly: true });
        console.log(req.cookies.jwt)
        const redir= req.session.prev || '/'
         res.status(200).redirect(redir)
    }else res.status(340).json({
        message : 'password does not matched'
    })
        //  delete req.session.prev
        //  console.log('prev : ',req.session.prev)
        }catch (e) {
            console.error(e);
            res.status(500).json({
              message: "Server Error"
            });
          }
        
  }else res.json({
    message: 'You are already logged in'
})
}

const forgetPassword=async(req,res)=>{ 
  const {email,password}=req.body;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
  const salt = await bcrypt.genSalt(10);
  const encryptPass= await bcrypt.hash(password, salt);
 const user= await User.updateOne({email:email.toLowerCase()},{$set:{password:encryptPass}})
  if(user.n){
    return res.status(200).redirect('/user/login')
  } return res.status(340).json({
    message : 'email does not matched'
  })
}

const isUsernameExist = async(req,res)=>{
  const username=req.body.username
  const isUserExist =await User.findOne({username})
  if (!isUserExist) res.status(200).json({isNotExist : true});
  else res.status(200).json({isNotExist : false});
}

module.exports={SignUPController,LoginController,forgetPassword,isUsernameExist}