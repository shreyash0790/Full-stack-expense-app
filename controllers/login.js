const Users = require('../models/sign');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


function genererateAccessToken(id){  
return jwt.sign({userId:id}, process.env.USER_TOKEN)
}

exports.GetUser = async (req, res, next) => {
    try {
        const Email = req.query.Email;
        const Password=req.query.Password;

        const existingUser = await Users.findOne( { Email: Email});
        if (existingUser) {
         bcrypt.compare(Password,existingUser.Password, (err,result)=>{
            if(err){
                throw new Error('Something went Wrong')
            }
            if (result==true) {
                return res.status(200).json({ User:existingUser, token:genererateAccessToken(existingUser._id) });
            } else  {
                return res.status(401).json({ error: 'password incorrect' });
            }
         })   
        } else {
            return res.status(404).json({ User: null }); 
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

