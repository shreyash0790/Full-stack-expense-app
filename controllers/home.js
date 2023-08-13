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
        const Amount= parseFloat(req.body.Amount);
        const Description= req.body.Description;
        const Category= req.body.Category; 
        const newExpense=await Expense.create({
        Amount: Amount,
        Description:Description,
        Category:Category,
        UserId:req.users.id
       })

        // Retrieve the user's current total expense
        const currentUser = await Users.findByPk(req.users.id);
        const currentTotalExpense = parseFloat(currentUser.TotalExpense || 0);

        // Calculate the new total expense
        const newTotalExpense = currentTotalExpense + Amount;

        // Update the user's total expense in the Users table
        await currentUser.update({ TotalExpense: newTotalExpense });

       res.status(201).json({ Expense: newExpense });
       
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
exports.deleteExp=async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    const userId = req.users.id;

    // Find the expense to be deleted and include the associated user
    const expense = await Expense.findOne({
        where: { id: expenseId, UserId: userId },
        include: { model: Users, attributes: ['id', 'TotalExpense'] }
    });
    console.log(expense.User)

    if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
    }

    const expenseAmount = expense.Amount;


    const newTotalExpense = Math.max(expense.User.TotalExpense - expenseAmount, 0);

    await expense.User.update({ TotalExpense: newTotalExpense });

    // Delete the expense
    await expense.destroy();
    res.status(200).json({ expense:'deleted'});npm


    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
}
exports.editExp = async (req, res, next) => {
  try {
    const userId = req.params.id; 
    const updatedAmount = parseFloat(req.body.Amount);
    const updatedDescription = req.body.Description;
    const updatedCategory = req.body.Category;

  
    const expense = await Expense.findOne({
      where: { id: userId, UserId: req.users.id },
      include: { model: Users, attributes: ['id', 'TotalExpense'] }
  });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

const amountDifference = updatedAmount - expense.Amount;

    // Update the expense fields
    expense.Amount = updatedAmount;
    expense.Description = updatedDescription;
    expense.Category = updatedCategory;
// Update the user's total expense
const user = expense.User;
const currentTotalExpense = parseFloat(user.TotalExpense || 0);
const newTotalExpense = Math.max(currentTotalExpense + amountDifference, 0);
await user.update({ TotalExpense: newTotalExpense });

// Save the updated expense and user to the database
await Promise.all([expense.save(), user.save()]);


  } catch (err) {
    console.error('Error updating expense:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
