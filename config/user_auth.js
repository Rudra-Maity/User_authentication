const jwt = require('jsonwebtoken');
function jwtSign(userid,expTime){
const token = jwt.sign({ userId: userid }, process.env.token, { expiresIn: expTime });
return token
}
function jwtDecode(givetoken){
try{
const decoded = jwt.verify(givetoken, process.env.token);
return decoded
}catch(e){
    return false
}
}
module.exports={jwtSign,jwtDecode}