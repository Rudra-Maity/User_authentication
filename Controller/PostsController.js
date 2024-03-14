const Posts=require('../models/posts');

const post_contents = require('../models/post_contents');

const FileHandeling=require('../config/FileHandeling')
const user=require('../models/UserModel');
const path = require('path');

const GetPosts=async function(req,res,next){
    try{
        const email=req.userid
        if(email){
            const count=await Posts.countDocuments()
            const shuffledItems = await Posts.find().limit(2).skip((req.query.page - 1) * 2);
            const page=req.query.page || 1
            // console.log(shuffledItems);
            const startIndex = (page - 1) * 2;
            const endIndex = page * 2;
            console.log(startIndex);
            
            // const results = shuffledItems.slice(startIndex, endIndex);
            

            const postids=  shuffledItems.map((item)=>{
                return item._id
            })

            console.log(postids);
        const contents=await post_contents.find({ postid: { $in: postids } });
        console.log(contents);
        
        res.json({
          currentPage: page,
          totalPages: Math.ceil(count / 10),
          contents
        });
      
    }else{
        req.session.prev=req.url
        res.redirect('/user/login')
    }
    }catch(e){
        console.log(e);

}
}

const createPosts=async function(req,res,next){
    try {
        const email=req.userid
       if(email){
        if (req.files || Object.keys(req.files).length !== 0 || req.body.txt){
            const finduser=await  user.findOne({email})
            let uploadFile=[];
            if(req.files || Object.keys(req.files).length !== 0){
             uploadFile=FileHandeling(req,finduser._id)
            }
        const newpost= await Posts({
            userid : finduser._id
        }) .save()


            const newpostContents=await post_contents({
                userid :finduser._id,
                postid:newpost._id,
                type : uploadFile.length>0 ?uploadFile[1] : '',
                txt: req.body.txt || '' ,
                path :uploadFile.length>0 ?('/'+finduser._id+'/'+uploadFile[0]) : ''
            }).save()
        
     return res.status(200).json(newpostContents)
       }else res.status(304).json({
        message :"file or text is requierd"
       })
    }
    }catch(e){
        console.log(e);
    }
}

module.exports={GetPosts,createPosts}