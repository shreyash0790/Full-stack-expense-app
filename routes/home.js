const express = require('express');
const router = express.Router();
const Homecontroller=require('../controllers/home');
const UserAuthen=require('../middleware/auth');

router.get('/GetExpense', UserAuthen.Authentication,Homecontroller.getExpense);

router.get('/download',UserAuthen.Authentication,Homecontroller.download)

router.get('/reports',UserAuthen.Authentication,Homecontroller.downloadOldreports)

router.post('/AddExpense',UserAuthen.Authentication, Homecontroller.addExpense);




router.delete('/delete/:id',UserAuthen.Authentication,Homecontroller.deleteExp)
router.put('/edit/:id',UserAuthen.Authentication,Homecontroller.editExp)




module.exports=router;