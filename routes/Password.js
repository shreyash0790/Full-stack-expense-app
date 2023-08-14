const express = require('express');
const router = express.Router();
const Passwordcontroller=require();


router.get('/password/forgotpassword', Passwordcontroller.PassReset);


module.exports=router;