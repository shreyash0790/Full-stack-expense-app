const mongoose=require('mongoose');
const Schema= mongoose.Schema

const Orders=new Schema({
 
PaymentId:{
  type: String,
  default:null

 },
OrderId:{
  type: String,
 },
Status:{
  type: String,
 },
 userId:{
  type:Schema.Types.ObjectId,
  ref:'User'
 }
})
module.exports=mongoose.model('Orders',Orders);
