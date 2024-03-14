const router=require('express').Router()
const auth = require('../middleware/auth')
const {GetComments,createComments}=require('../Controller/CommentsController');

router.get('/comments',auth,GetComments);
router.post('/comments/:postid',auth,createComments);

module.exports=router