const jwtDecode = require('../config/user_auth').jwtDecode;
const parseCookie=require('../config/accesCookieFromHeaders')

module.exports = function(req, res, next) {

  const token = parseCookie(req.headers.cookie).token;
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwtDecode(token);
    // req.user = decoded.user;
    console.log(decoded.userId);
    if(decoded){ 
      req.userid=decoded.userId
      next()
    }
    else return res.json({message :'Auth error'})
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Internal server error" });
  }
};
