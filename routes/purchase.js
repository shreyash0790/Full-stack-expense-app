const express = require('express');
const router = express.Router();

const UserAuthen=require('../middleware/auth');
const BuyPremium=require('../controllers/purchase')

router.get('/Purchase/BuyPremium',UserAuthen.Authentication,BuyPremium.PremiumMember)
router.get('/Purchase/getUsers',UserAuthen.Authentication,BuyPremium.getUsers)



router.post('/Purchase/UpdateTransctionStat',UserAuthen.Authentication,BuyPremium.updateTrans)




module.exports=router;