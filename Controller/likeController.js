const postmodel=require('../models/posts');

const UpdateLIKE=async (req,res)=>{
    try{
        if(req.userid){
            const postid=req.query.postid
            const like=req.query.like
            console.log(req.query.like,postid);
            if(postid && like==1){
       const posts=await postmodel.findOneAndUpdate({_id:postid},
        { $inc: { likes: 1 } },{ new: true } )
        res.json(posts)
    }
    else if (postid && like==0){
        const findpost=await postmodel.findOne({_id:postid});
        if(findpost.likes>0){
            //here min validator is not work so I describe this way
        const posts=await postmodel.findOneAndUpdate({_id:postid},
            { $inc: { likes: -1 } },{ new: true, runValidators: true } )

            res.json(posts)
        }else res.json({like:0})
    }else res.json({
        message: "some field missing"
    })
}
}catch(e){
    // console.log(e);
    res.json({
        message:"some error"
    })
}
}

module.exports=UpdateLIKE