const router=require('express').Router()
const auth = require('../middleware/auth');
const {GetReplies,creatReplies,updateReplies,DeleteReplies}=require('../Controller/RepliesController')

router.get('/replies',auth,GetReplies);
router.post('/replies/:postid/:cmtid/:replyreciverid',auth,creatReplies);
router.put('/reply/:replyid',auth,updateReplies)
router.delete('/reply/:replyid',auth,DeleteReplies)

module.exports=router