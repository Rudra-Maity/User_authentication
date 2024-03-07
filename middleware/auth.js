const jwtDecode = require('../config/user_auth').jwtDecode

module.exports = function(req, res, next) {
  // console.log(req.cookies.token);
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwtDecode(token);
    // req.user = decoded.user;
    console.log(decoded);
    if(decoded){ 
      req.userid=decoded.userId
      next()
    }
    else return res.json({message :'Auth error'})
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
