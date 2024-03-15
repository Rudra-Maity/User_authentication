const user=require('../models/UserModel');
const comments=require('../models/comments');
const RepliesModel=require('../models/replies');


const GetComments =async function(req,res){
    try{
        const page=req.query.page || 1
        const startIndex = (page - 1) * 2;
        const endIndex = page * 2;
        const cmtid=req.query.cmtid
        const postid=req.query.postid
        if(cmtid){
            const getComment= await comments.findOne({_id:cmtid})
            res.status(200).json({
                getComment
            })
        }else if(postid){
            const count=await comments.countDocuments()
            const Items = await comments.find({postid}).limit(2).skip((req.query.page - 1) * 2);
            return res.status(200).json({
                Items,count,startIndex,endIndex
            })
            
        }else if(!postid || !cmtid){
            res.status(340).json({
                message : "post id or comment id is requierd"
            });
        }else res.status(400).json({
            message : "some Error"
        });
    }catch(e){
        res.json({message : "some other error"})
        // console.log(e);
    }
}

const createComments=async function(req,res){
    const email=req.userid
    if(email){
        try{
        const postid=req.params.postid
        const txt= req.body.txt
        if(txt){
            console.log('dsrfwer', txt.length);
        const commenterid=await user.findOne({email})
        const Newcomment=new comments({
            postid,commenterid:commenterid._id ,txt
        })
        Newcomment.save()
        console.log(Newcomment);
        res.status(200).json({Newcomment})
    }else {
        console.log('dsds');
        return res.status(340).json({message:"text field compulsory"})
    }
}catch(e){
    res.status(340).json({
        message :"some error"
    })
 }
}
// console.log('rqweer');
}

const updateComment=async function(req,res){
    const email=req.userid
    if(email){
        try{
            const txt=req.body.txt 
            if(txt){
            const cmtid=req.params.cmtid
            const id=await user.findOne({email});
            console.log(id);
            const updatecomment=await comments.updateOne({_id:cmtid,commenterid:id._id},{ $set: {txt,updatedtime:new Date()} })

            console.log(updatecomment);
            if(updatecomment.n && updatecomment.nModified && updatecomment.ok){
                return res.status(200).json(updatecomment)
            }
            else return res.status(340).json({
                message : "comment id or userid not found"
            })
            }
      else  return res.status(340).json({message:"text field compulsory"})

        }catch(e){
            return res.status(340).json({
                message : "comment id or userid not found"
            })
            // console.log(e);
        }
    }
}

const DeleteComment= async function(req,res){
    const email=req.userid
    if(email){
        try{
            
            const cmtid=req.params.cmtid
            const id=await user.findOne({email},{_id:1});
            const deletepost=await comments.deleteOne({_id:cmtid,commenterid:id._id})

            const delreply=await RepliesModel.deleteMany({cmtid})

            if( deletepost.ok && deletepost.n ){
                console.log(deletepost);
                return res.status(200).json(deletepost)
                
            }
            else return res.status(340).json({
                message : "comment id or userid is not found"
            })
            

        }catch(e){
            return res.status(340).json({
                message : "comment id or userid not found"
            })
            // console.log(e);
        }
    }
}


module.exports={GetComments,createComments,updateComment,DeleteComment}