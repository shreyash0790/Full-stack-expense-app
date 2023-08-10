const jwt=require('jsonwebtoken');
const Users=require('../models/sign');


exports.Authentication=async(req,res,next)=>{

try{
const token=req.header("Authorization")
const user=jwt.verify(token, '4jj424jjjfsdnbd34jmj4jmv9ddddtr93njmf3465' )
console.log('userId>>', user.userId)
 
  
const users = await Users.findByPk(user.userId);
    
if (users) {
  req.users = users;  // its used here so that req.users can be used to get the id when we use get response when dom reloads 
  next();
} else {
  res.status(404).json({ error: 'User not found' });
}


}catch{
    res.status(500).json({ error: ' Error in Authentication' });
}
}