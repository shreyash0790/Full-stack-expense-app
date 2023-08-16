const express = require('express');
const router = express.Router();
const Passwordcontroller=require('../controllers/PasswordReset');


router.post('/password/forgotpassword', Passwordcontroller.forgotpassword);

router.get('/password/resetpassword/:id',Passwordcontroller.resetPassword)

router.put('/password/updatepass/:updateid',Passwordcontroller.updatePassword)


module.exports=router;