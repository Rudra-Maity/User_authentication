const Posts=require('../models/posts');

const post_contents = require('../models/post_contents');
const commentsModel=require('../models/comments')
const RepliesModel=require('../models/replies')

const FileHandeling=require('../config/FileHandeling')
const filedel=require('../config/filedelete')

const user=require('../models/UserModel');
const path = require('path');

const GetPosts=async function(req,res,next){
    try{
        const email=req.userid
        if(email){
            const count=await Posts.countDocuments()
            const shuffledItems = await Posts.find().limit(10).skip((req.query.page - 1) * 10);
            const page=req.query.page || 1
            // console.log(shuffledItems);
            const startIndex = (page - 1) *10;
            const endIndex = page * 10;
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
        req.status(340).json({message : "some error"})
        // console.log(e);

}
}

const createPosts=async function(req,res,next){
    try {
        const email=req.userid
       if(email){
        if (req.files || req.body.txt){
            const finduser=await  user.findOne({email})
            let uploadFile=[];
            if(req.files ){
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
        res.status(400).json({message  : "some error"})
        // console.log(e);
    }
}

const updatePost=async function(req,res){
    const email=req.userid
    if(email){
        try{
            const txt=req.body.txt 
            if(txt){
            const postid=req.params.postid
            const id=await user.findOne({email},{_id:1});
            const updatepost=await post_contents.updateOne({postid,userid:id._id},{ $set: {txt,updatedtime:new Date()} })


            if(updatepost.n && updatepost.nModified && updatepost.ok){
                console.log(updatepost);
                return res.status(200).json(updatepost)
            }
            else return res.status(340).json({
                message : "post id or userid not found"
            })
            }
      else  return res.status(340).json({message:"text field compulsory"})

        }catch(e){
            return res.status(340).json({
                message : "post id or userid not found"
            })
            // console.log(e);
        }
    }
}

const DeletePosts= async function(req,res){
    const email=req.userid
    if(email){
        try{
            
            const postid=req.params.postid
            const id=await user.findOne({email},{_id:1});
            const findfile=await post_contents.findOne({postid})
            console.log('fadda',findfile);
            if(findfile.path){
                const isFiledel=filedel(path.join(__dirname,'..','public',`${findfile.path}`))
                console.log('fe',isFiledel);
               if(!isFiledel){
                return res.json({file:'file not deleted'})
               }
            }
            const deletepost=await post_contents.deleteOne({postid,userid:id._id})

            const deletep=await Posts.deleteOne({_id:postid})
            const delcom=await commentsModel.deleteMany({postid})
            const delreply=await RepliesModel.deleteMany({postid})

            if( deletepost.ok && deletepost.n && deletep.n){
               
                console.log(deletepost);
                return res.status(200).json(deletepost)
                
            }
            else return res.status(340).json({
                message : "post id or userid not found"
            })
            

        }catch(e){
            console.log(e);
            return res.status(340).json({
                message : "post id or userid not found"
            })
        }
    }
}

module.exports={GetPosts,createPosts,updatePost,DeletePosts}