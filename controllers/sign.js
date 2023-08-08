const Users = require('../models/sign');

exports.AddUser=async (req, res, next) => {
    try {
        const Name= req.body.Name;
        const Email= req.body.Email;
        const Password= req.body.Password;
        const newUser=await Users.create({
        Name: Name,
        Email:Email,
       Password:Password,
       })
       res.status(201).json({ User: newUser});
       console.log('newUSer  fn called');
       
      } catch (err) {
        console.error('Error adding expense:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}