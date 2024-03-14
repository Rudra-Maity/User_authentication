const mongoose=require('mongoose');

const Comments=new mongoose.Schema({

 createdtime : {type : Date ,default : new Date()},
 updatedtime : {type : Date ,default : new Date()},
 postid : {type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'Posts'},
 commenterid : {type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'user'},
 txt : {type : String ,required : true},
})

module.exports=mongoose.model('Comments',Comments);