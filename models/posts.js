const mongoose=require('mongoose');

const Posts=new mongoose.Schema({
 createdtime : {type : Date ,default : new Date()},
 updatedtime : {type : Date ,default : new Date()},
 userid : {type: mongoose.Schema.Types.ObjectId, required : true ,ref : 'Users'},
 likes:{type:  Number  ,min:[0,'err'] ,default :0}
});

module.exports= mongoose.model('Posts',Posts);