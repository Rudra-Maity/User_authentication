const mongoose=require('mongoose');

const Replies=new mongoose.Schema({

 createdtime : {type : Date ,default : new Date()},
 updatedtime : {type : Date ,default : new Date()},
 commenterid : {type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'Comments'},
 replysenderid :{type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'Users'},
 replyreciverid :{type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'Users'},
 postid : {type: mongoose.Schema.Types.postid, required : true ,ref : 'Comments'},

});

module.exports= mongoose.model('Replies',Replies);