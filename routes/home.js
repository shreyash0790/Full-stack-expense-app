const express = require('express');
const router = express.Router();
const Homecontroller=require('../controllers/home');
const UserAuthen=require('../controllers/auth');

router.get('/GetExpense', UserAuthen.Authentication,Homecontroller.getExpense);
router.post('/AddExpense',UserAuthen.Authentication, Homecontroller.addExpense);


router.delete('/delete/:id',UserAuthen.Authentication,Homecontroller.deleteExp)
router.put('/edit/:id',UserAuthen.Authentication,Homecontroller.editExp)



module.exports=router;