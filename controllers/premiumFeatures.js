const Expense = require('../models/home');
const Users = require('../models/sign');
const sequelize=require('../util/database');



exports.getleader= async (req, res, next) => {
  try {
    const leaderDetails = await Expense.findAll({
        attributes: [
            'UserId',
            [sequelize.fn('SUM', sequelize.col('Amount')), 'totalCost'],  // here we added all amount with same userid and termed it as totalcost
        ],
        group: ['UserId'],// here we grouped total cost with associated userId
        include: [{ model: Users, attributes: ['Name'] }],//we included User model for getting name 
        order: [[sequelize.literal('totalCost'), 'DESC']],//sorting the total cost 
    });

    return res.status(201).json(leaderDetails);
} catch (err) {
    console.error(err); 
      res.status(500).json({ error: 'Internal Server Error' });
  }
  
  }
  