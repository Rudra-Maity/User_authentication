const router=require('express').Router()

const auth = require('../middleware/auth')
const {GetPosts,createPosts,updatePost,DeletePosts}=require('../Controller/PostsController');

router.get('/',auth,GetPosts);

router.get('/post',(req,res)=>{
    res.send(`
    <form action="/post" method="POST" enctype="multipart/form-data">
    <input type="file" name="file" accept="image/*"> <!-- Change "image/*" to the desired file type -->
    <br><br>
    <input type="submit" value="Upload">
  </form>
    `)
})
router.post('/post',auth,createPosts)
router.put('/post/:postid',auth,updatePost);
router.delete('/post/:postid',auth,DeletePosts)

module.exports=router