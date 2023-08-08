const express = require('express');
const router = express.Router();
const logincontroller=require('../controllers/login');

router.get('/GetUser', logincontroller.GetUser);


module.exports=router;