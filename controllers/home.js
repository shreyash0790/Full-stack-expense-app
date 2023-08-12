const Expense = require('../models/home');
const Users = require('../models/sign');


 
exports.getExpense=async (req, res, next) => {
    try {
    const allExpenses = await Expense.findAll({where :{userId:req.users.id}});
    res.status(200).json({Expenses: allExpenses });
    


        

      } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
}


exports.addExpense=async (req, res, next) => {
    try {
        const Amount= req.body.Amount;
        const Description= req.body.Description;
        const Category= req.body.Category; 
        const newExpense=await Expense.create({
        Amount: Amount,
        Description:Description,
        Category:Category,
        UserId:req.users.id
       })
       res.status(201).json({ Expense: newExpense });
       console.log('addExpense function called');
       
      } catch (err) {
        console.error('Error adding expense:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
exports.deleteExp=async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log('userId:', userId);
    console.log('req.users:', req.users.id);
    const exp = await Expense.findOne({where:{id:userId,UserId:req.users.id}});
      await exp.destroy()
      res.status(200).json({ deleteExpenses: exp });

    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
}
exports.editExp = async (req, res, next) => {
  try {
    const userId = req.params.id; 
    const updatedAmount = req.body.Amount;
    const updatedDescription = req.body.Description;
    const updatedCategory = req.body.Category;

  
    const expense = await Expense.findOne({where:{id:userId,UserId:req.users.id}})

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Update the expense fields
    expense.Amount = updatedAmount;
    expense.Description = updatedDescription;
    expense.Category = updatedCategory;

    // Save the updated expense to the database
    await expense.save();


  } catch (err) {
    console.error('Error updating expense:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
