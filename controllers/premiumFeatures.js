const Expense = require('../models/home');
const Users = require('../models/sign');
const sequelize=require('../util/database');



exports.getleader= async (req, res, next) => {
  try {
    const leaderDetails = await Users.findAll({
        attributes: ['id', 'Name', 'TotalExpense'], // Include the TotalExpense column
        order: [[sequelize.col('TotalExpense'), 'DESC']], // Order by TotalExpense in descending order
    });
    return res.status(201).json(leaderDetails);
} catch (err) {
    console.error(err); 
      res.status(500).json({ error: 'Internal Server Error' });
  }
  
  }
  