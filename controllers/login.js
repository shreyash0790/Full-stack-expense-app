const Users = require('../models/sign');
const bcrypt= require('bcrypt');

exports.GetUser = async (req, res, next) => {
    try {
        const Email = req.query.Email;
        const Password=req.query.Password;

        const existingUser = await Users.findOne({ where: { Email: Email} });
        if (existingUser) {
         bcrypt.compare(Password,existingUser.Password, (err,result)=>{
            if(err){
                throw new Error('Something went Wrong')
            }
            if (result==true) {
                return res.status(200).json({ User: 'login successful' });
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