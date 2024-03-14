const user=require('../models/UserModel');
const comments=require('../models/comments');


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
        res.json()
        console.log(e);
    }
}

const createComments=async function(req,res){
    const email=req.userid
    if(email){
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
 }
// console.log('rqweer');
}

module.exports={GetComments,createComments}