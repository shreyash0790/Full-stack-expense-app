const Expense = require('../models/login');

 
exports.getExpense=async (req, res, next) => {
    try {
    const allExpenses = await Expense.findAll();
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
    const exp = await Expense.findOne({where:{id:userId}});
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

  
    const expense = await Expense.findByPk(userId);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Update the expense fields
    expense.Amount = updatedAmount;
    expense.Description = updatedDescription;
    expense.Category = updatedCategory;

    // Save the updated expense to the database
    await expense.save();

    // Respond with the updated user data (optional)
    const updatedUser = {
      id: userId,
      Amount: updatedAmount,
      Description: updatedDescription,
      Category: updatedCategory
    };
    res.status(200).json({ updatedUser });

  } catch (err) {
    console.error('Error updating expense:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
