const Brevo = require('sib-api-v3-sdk'); 
const uuid = require('uuid');
const Forgotpassword = require('../models/PasswordReset');
const Users = require('../models/sign');
const bcrypt= require('bcrypt');
require('dotenv').config();

exports.forgotpassword= async (req, res, next) => {
    try {
        const Email= req.body.Email; 
        console.log(Email);

        const user = await Users.findOne({where : { Email:Email }});
        if(user){
            const id = uuid.v4();
           await Forgotpassword.create({ id , IsActive: true })
                
            }


const  Client = Brevo.ApiClient.instance;
const  apiKey = Client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_KEY;
const transEmailApi = new Brevo.TransactionalEmailsApi();
const sender ={
    email:'shreyaskar.singh@yandex.com',
    name:'Expense Tracker'

}
const receivers=[

    {
        email:Email
    }

];

transEmailApi.sendTransacEmail({
    sender,
    to:receivers,
    subject:'Password Reset For Expense Tracker  ',
    htmlContent:
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h2 style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Your  Password  reset  link  for  EXPENSE TRACKER APP  is  Below</h2>
        <h3 style="font-family: Verdana, Geneva, Tahoma, sans-serif;"><a href="http://localhost:5000/password/resetpassword/${id}">Click here To reset Your Password!</a> </h3>
    </body>
    </html>
    `

}).then((res)=>console.log(res))

res.status(200).json('Email send sucesssfully');


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const id = req.params.id;
        const forgotpasswordrequest = await Forgotpassword.findOne({ where: { id: id } });

        if (forgotpasswordrequest) {
            await forgotpasswordrequest.update({ IsActive: false });
            res.redirect(`http://localhost:5000/newPassword.html?id=${id}`);
        } else {
            res.status(404).send("Reset request not found");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};







exports.updatePassword=async (req, res, next) => {
    try {
        const Password= req.body.Password;
        const id=req.params

        
        const UpdateUserPass = await Forgotpassword.findOne({
             where: { id:id },
             include:Users});
        if (UpdateUserPass&& UpdateUserPass.Users) {
          
        }
        const saltrounds=10;
        bcrypt.hash(Password,saltrounds,async(err,hash)=>{
          const UpdateUser=await Users.update({

           Password:hash
           })
           console.log(err);
           res.status(201).json({ UpdatedPass: UpdateUser});

        })
       
      } catch (err) {
        console.error('Error adding expense:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}