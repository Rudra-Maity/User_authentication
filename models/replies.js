const mongoose=require('mongoose');

const Replies=new mongoose.Schema({

 createdtime : {type : Date ,default : new Date()},
 updatedtime : {type : Date ,default : new Date()},
 cmtid : {type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'Comments'},
 replysenderid :{type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'user'},
 replyreciverid :{type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'user'},
 postid : {type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'Comments'},
 txt : {type : String ,required : true}

});

module.exports= mongoose.model('Replies',Replies);