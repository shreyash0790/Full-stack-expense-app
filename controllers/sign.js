const Users = require('../models/sign');
const bcrypt= require('bcrypt');


exports.AddUser=async (req, res, next) => {
    try {
        const Name= req.body.Name;
        const Email= req.body.Email;
        const Password= req.body.Password;

        // Check if the email already exists in the database
        const existingUser = await Users.findOne({ Email: Email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const saltrounds=10;
        bcrypt.hash(Password,saltrounds,async(err,hash)=>{
          const newUser=await new Users({
            Name: Name,
            Email:Email,
           Password:hash
           }).save()
           console.log(err);
           res.status(201).json({ User: newUser});

        })
       
      } catch (err) {
        console.error('Error Adding User', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
