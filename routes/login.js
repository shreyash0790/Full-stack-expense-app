const express = require('express');
const router = express.Router();
const logincontroller=require('../controllers/login');

router.get('/GetExpense', logincontroller.getExpense);
router.post('/AddExpense', logincontroller.addExpense);


router.delete('/delete/:id',logincontroller.deleteExp)
router.put('/edit/:id',logincontroller.editExp)

module.exports=router;