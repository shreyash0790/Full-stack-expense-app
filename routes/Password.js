const express = require('express');
const router = express.Router();
const Passwordcontroller=require('../controllers/PasswordReset');


router.post('/password/forgotpassword', Passwordcontroller.PassReset);


module.exports=router;