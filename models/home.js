const mongoose=require('mongoose');
const Schema= mongoose.Schema


const Expense=new Schema({
Amount:{
  type:Number,
  required:true
 },
 Description:{
  type: String,
  required:true
 },
Category:{
  type: String,
  required:true
 },
 Income:{
  type: Number,
  required:true
 },
 createdAt: {
  type: Date,
  default: Date.now,
},
 userId:{
  type:Schema.Types.ObjectId,
  ref:'User'
 }

})
module.exports=mongoose.model('Expense',Expense);
