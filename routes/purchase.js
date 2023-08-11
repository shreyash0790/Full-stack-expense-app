const express = require('express');
const router = express.Router();

const UserAuthen=require('../controllers/auth');
const BuyPremium=require('../controllers/purchase')

router.get('/Purchase/BuyPremium',UserAuthen.Authentication,BuyPremium.PremiumMember)
router.post('/Purchase/UpdateTransctionStat',UserAuthen.Authentication,BuyPremium.UpdateTrans)




module.exports=router;