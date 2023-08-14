const Brevo = require('sib-api-v3-sdk'); 
require('dotenv').config();

exports.PassReset= async (req, res, next) => {
    try {
        const Email= req.body.Email; 
        console.log(Email);
        const  Client = Brevo.ApiClient.instance;
// Configure API key authorization: api-key
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
        <h3 style="font-family: Verdana, Geneva, Tahoma, sans-serif;"><a href="#!">Click here To reset Your Password!</a> </h3>
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

