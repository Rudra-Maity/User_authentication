const auth = require('../middleware/auth');
const likecontroller=require('../Controller/likeController')

const router=require('express').Router();

router.put('/likes',auth,likecontroller)

module.exports=router