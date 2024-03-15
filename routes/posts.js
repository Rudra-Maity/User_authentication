const router=require('express').Router()

const auth = require('../middleware/auth')
const {GetPosts,createPosts,updatePost,DeletePosts}=require('../Controller/PostsController');

router.get('/',auth,GetPosts);

router.post('/post',auth,createPosts)
router.put('/post/:postid',auth,updatePost);
router.delete('/post/:postid',auth,DeletePosts)

module.exports=router