const comments=require('../models/comments');
const replies=require('../models/replies');
const user=require('../models/UserModel')


const GetReplies =async function(req,res){
    try{
        const page=req.query.page || 1
        const startIndex = (page - 1) * 2;
        const endIndex = page * 2;
        const cmtid=req.query.cmtid
        const repliesid=req.query.repliesid
        if(repliesid){
            const getReplies= await replies.findOne({_id:repliesid})
            res.status(200).json({
                getReplies
            })
        }else if(cmtid){
            const count=await replies.countDocuments()
            const Items = await replies.find({cmtid}).limit(2).skip((req.query.page - 1) * 2);
            return res.status(200).json({
                Items,count,startIndex,endIndex
            })
            
        }else if(!repliesid || !cmtid){
            res.status(340).json({
                message : "replies id or comment id is requierd"
            });
        }else res.status(400).json({
            message : "some Error"
        });
    }catch(e){
        res.json()
        console.log(e);
    }
}

const creatReplies=async function(req,res){
    const email=req.userid
    console.log('dwedewe',email);
    if(email){
        try{
        const postid=req.params.postid
        const replyreciverid=req.params.replyreciverid
        const cmtid=req.params.cmtid
        const txt= req.body.txt
        if(txt){
            console.log('dsrfwer', txt.length);
        const replysenderid=await user.findOne({email})
        const NewReplies=new replies({
            postid,replysenderid:replysenderid._id ,txt,replyreciverid,cmtid
        })
        NewReplies.save()
        console.log(NewReplies);
        res.status(200).json({NewReplies})
    }else {
        console.log('dsds');
        return res.status(340).json({message:"text field compulsory"})
    }
 }catch(e){
    res.status(400).json({message  : "some error"})
    // console.log(e);
 }
}
// console.log('rqweer');
}

const updateReplies=async function(req,res){
    const email=req.userid
    if(email){
        try{
            const txt=req.body.txt 
            if(txt){
            const replyid=req.params.replyid
            const id=await user.findOne({email});
            // console.log(id);
            const updatereplies=await replies.updateOne({_id:replyid,replysenderid:id._id},{ $set: {txt,updatedtime:new Date()} })

            console.log(updatereplies);
            if(updatereplies.n && updatereplies.nModified && updatereplies.ok){
                return res.status(200).json(updatereplies)
            }
            else return res.status(340).json({
                message : "Replies id or userid not found"
            })
            }
      else  return res.status(340).json({message:"text field compulsory"})

        }catch(e){
            // console.log(e);
            return res.status(340).json({
                message : "Some Error"
            })
            // console.log(e);
        }
    }
}

const DeleteReplies= async function(req,res){
    const email=req.userid
    if(email){
        try{
            
            const replyid=req.params.replyid
            const id=await user.findOne({email},{_id:1});
            const deletereplies=await replies.deleteOne({_id:replyid,replysenderid:id._id})

            console.log(deletereplies);
            if( deletereplies.ok && deletereplies.n){
                return res.status(200).json(deletereplies)
            }
            else return res.status(340).json({
                message : "Replies id or userid is not found"
            })
            

        }catch(e){
            return res.status(340).json({
                message : "Some error"
            })
            // console.log(e);
        }
    }
}

module.exports={GetReplies,creatReplies,updateReplies,DeleteReplies};