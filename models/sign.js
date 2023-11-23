const mongoose=require('mongoose');


const Schema= mongoose.Schema

const User=new Schema({
Name:{
  type: String,
 required:true
 },
 Email:{
  type: String,
 required:true
 },
Password:{
  type: String,
  required:true

 },
 IsPremiumUser:{
  type:Boolean,
  default:false
 },
 TotalExpense:{
  type:Number,
  default:0
 },
})
module.exports=mongoose.model('User', User);
