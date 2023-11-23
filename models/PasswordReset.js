const mongoose=require('mongoose');
const Schema= mongoose.Schema

const PasswordReset=new Schema({
IsActive:{
  type:Boolean,
 required:true,
 },
 expiresAt: {
   type: Date,
   required: true,
   default: Date.now, // set the default expiration time to the current time
   index: { expires: '1h' }, // expires in 1 hour
 },
 userId:{
  type:Schema.Types.ObjectId,
  ref:'User'
 }
})
module.exports=mongoose.model('PasswordReset',PasswordReset);
