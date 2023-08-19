const Expense = require('../models/home');
const Users = require('../models/sign');
const sequelize=require('../util/database');
const AWS=require('aws-sdk');
require('dotenv').config();


 
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
    const Amount = parseFloat(req.body.Amount);
        const Description = req.body.Description;
        const Category = req.body.Category;
        const Income=req.body.Income
    await sequelize.transaction(async (t) => {
         
        // Create the new expense
        const newExpense = await Expense.create({
            Amount: Amount,
            Description: Description,
            Category: Category,
            Income:Income,
            UserId: req.users.id
        }, { transaction: t });

        // Update the user's total expense
        const [affectedRows] = await Users.update(
            { TotalExpense: sequelize.literal(`TotalExpense + ${Amount}`) },
            { where: { id: req.users.id }, returning: true, transaction: t }
        );

        if (affectedRows === 0) {
            throw new Error('User not found');
        }

        res.status(201).json({ Expense: newExpense });
    });
} catch (err) {
  console.log(err)
    res.status(500).json({ error: 'Internal Server Error' });
}
}
exports.deleteExp=async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    const userId = req.users.id;

    await sequelize.transaction(async (t) => {
        // Find the expense to be deleted and include the associated user
        const expense = await Expense.findOne({
            where: { id: expenseId, UserId: userId },
            include: { model: Users, attributes: ['id', 'TotalExpense'] },
            transaction: t
        });

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        // Calculate expense amount and new TotalExpense
        const expenseAmount = expense.Amount;
        const newTotalExpense = Math.max(expense.User.TotalExpense - expenseAmount, 0);

        // Update user's TotalExpense and delete the expense in one transaction
        await Promise.all([
            expense.User.update({ TotalExpense: newTotalExpense }, { transaction: t }),
            expense.destroy({ transaction: t })
        ]);

       
        res.status(200).json({ expense: 'deleted' });
    });
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
    const updatedIncome=req.body.Income

    await sequelize.transaction(async (t) => {
        const expense = await Expense.findOne({
            where: { id: userId, UserId: req.users.id },
            include: { model: Users, attributes: ['id', 'TotalExpense'] },
            transaction: t
        });

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        const amountDifference = updatedAmount - expense.Amount;

        // Update the expense fields
        expense.Amount = updatedAmount;
        expense.Description = updatedDescription;
        expense.Category = updatedCategory;
        expense.Income=updatedIncome

        // Update the user's total expense
        const user = expense.User;
        const currentTotalExpense = parseFloat(user.TotalExpense || 0);
        const newTotalExpense = Math.max(currentTotalExpense + amountDifference, 0);

        // Save the updated expense and user within the transaction
        await Promise.all([
            expense.save({ transaction: t }),
            user.update({ TotalExpense: newTotalExpense }, { transaction: t })
        ]);
    });

    res.status(200).json({ success: true });

} catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
}
};


exports.download=async (req, res, next) => {
    try {
    const Expenses = await Expense.findAll({where :{userId:req.users.id}});
    const dataTostring=JSON.stringify(Expenses)
    const filename='Expense.txt';
    const fileUrl=UploadtoS3(dataTostring,filename)
    res.status(200).json({fileUrl:fileUrl,success:true});
    console.log(fileUrl);
    
      } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
}



function UploadtoS3(data,filename){

let s3bucket=new AWS.S3({
    Useraccesskey:process.env.IAM_ACCESS_KEY,
    secretkey:process.env.IAM_SECRET_KEY,
})

s3bucket.createBucket(()=>{
    var params={
        Bucket:process.env.BUCKET_NAME,
        Key:filename,
        Body:data

    }
  
    s3bucket.upload(params, (err,res)=>{
        if(err){
            console.log('error in uploading',err)
        }
        else{
            console.log('upload sucessfull',res)
        }

    })
})


}
