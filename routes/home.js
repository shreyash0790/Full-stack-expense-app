const express = require('express');
const router = express.Router();
const Homecontroller=require('../controllers/home');

router.get('/GetExpense', Homecontroller.getExpense);
router.post('/AddExpense', Homecontroller.addExpense);


router.delete('/delete/:id',Homecontroller.deleteExp)
router.put('/edit/:id',Homecontroller.editExp)

module.exports=router;