const express = require('express');
const router = express.Router();

const UserAuthen=require('../middleware/auth');
const PremiumFeat=require('../controllers/premiumFeatures')


router.get('/Premium/getleader',UserAuthen.Authentication,PremiumFeat.getleader)







module.exports=router;