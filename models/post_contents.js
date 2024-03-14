const mongoose=require('mongoose');

const Post_contents=new mongoose.Schema({

 createdtime : {type : Date ,default : new Date()},
 updatedtime : {type : Date ,default : new Date()},
 userid : {type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'Posts'},
 postid : {type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'Posts'},
 type : {type : String,default:'' },
 txt : {type : String},
 path : {type : String , default:''},
 
});

module.exports=mongoose.model('Post_contents',Post_contents);