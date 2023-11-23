const Brevo = require('sib-api-v3-sdk'); 
const Forgotpassword = require('../models/PasswordReset');
const Users = require('../models/sign');
const bcrypt= require('bcrypt');
require('dotenv').config();

exports.forgotpassword= async (req, res, next) => {
    try {
        const Email= req.body.Email; 
        console.log(Email);

        const user = await Users.findOne({ Email:Email });
        if(user){
           await Forgotpassword.create({ IsActive: true })
            }

 const id = Forgotpassword._id;
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
        const forgotpasswordrequest = await Forgotpassword.findOne({ _id: id });

        if (forgotpasswordrequest) {
            await forgotpasswordrequest.update({ IsActive: false });
            res.redirect(`http://localhost:5000/html/newPassword.html?id=${id}`);
        } else {
            res.status(404).send("Reset request not found");
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
    }
};



exports.updatePassword = async (req, res, next) => {
    try {
        const newPassword = req.body.Password;
        const updateId = req.params.updateid;

        const updateUserPass = await ForgotPassword.findOne({
            _id: updateId
        }).populate('User'); // Assuming 'User' is the field that references the User model

        if (!updateUserPass) {
            return res.status(404).json({ error: 'Record not found' });
        }

        const saltRounds = 10;

        bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Update user's password
            const updateUser = await User.findByIdAndUpdate(
                updateUserPass.User._id,
                { Password: hash },
                { new: true }
            );

            res.status(201).json({ UpdatedPass: updateUser });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};