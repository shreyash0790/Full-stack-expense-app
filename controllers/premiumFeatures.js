
const Users = require('../models/sign');




exports.getleader = async (req, res, next) => {
  try {
      const leaderDetails = await Users.find()
          .select('Name TotalExpense')                         // id included by default
          .sort({ TotalExpense: -1 });

      return res.status(200).json(leaderDetails);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};