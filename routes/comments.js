const router=require('express').Router()
const auth = require('../middleware/auth')
const {GetComments,createComments,updateComment,DeleteComment}=require('../Controller/CommentsController');

router.get('/comments',auth,GetComments);
router.post('/comments/:postid',auth,createComments);
router.put('/comment/:cmtid',auth,updateComment);
router.delete('/comment/:cmtid',auth,DeleteComment)

module.exports=router