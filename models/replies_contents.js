const mongoose=require('mongoose');

const Replie_contents=new mongoose.Schema({

 createdtime : {type : Date ,default : new Date()},
 updatedtime : {type : Date ,default : new Date()},

 replysenderid : {type: mongoose.Schema.Types.replysenderid, required : true ,ref : 'Replies'},
 replyreciverid : {type: mongoose.Schema.Types.replyreciverid, required : true ,ref : 'Replies'},
 postid : {type: mongoose.Schema.Types.postid, required : true ,ref : 'Replies'},
 type : {type : String , required :true},
 txt : {type : String},
 path : {type : String ,required :true},

});

module.exports=mongoose.model('Replie_contents',Replie_contents);