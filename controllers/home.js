const Expense = require('../models/home');
const Users = require('../models/sign');
const Reports = require('../models/Reports');
const S3services = require('../services/S3services');
require('dotenv').config();



exports.getExpense = async (req, res, next) => {
    try {

        const page = +req.query.page || 1;
        const ItemPerPage= +req.query.itemsPerPage||4;
        const Total = await Expense.countDocuments({ userId: req.users._id });
        const allExpenses = await Expense.find({userId: req.users._id })
        .skip((page - 1) * ItemPerPage)
        .limit(ItemPerPage);


        const pagedata = {
            currentPage: page,
            previousPage: page - 1,
            nextPage: page + 1,
            haspreviousPage: page > 1,
            hasnextPage: ItemPerPage * page < Total,


        }

        res.status(200).json({ Expenses: allExpenses, pagedata: pagedata });

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


exports.addExpense = async (req, res, next) => {
    try {
        const { Amount, Description, Category, Income } = req.body;

        const newExpense = new Expense({
            Amount: parseFloat(Amount),
            Description: Description,
            Category: Category,
            Income: Income,
            userId:req.users
        });

        await newExpense.save();

       
        const updatedUser = await Users.findByIdAndUpdate(                          //  user's total expense
            req.users._id,
            { $inc: { TotalExpense: parseFloat(Amount) } },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        res.status(201).json({ Expense: newExpense });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteExp = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        const userId = req.users._id; 

        
        const expense = await Expense.findOne({
            _id: expenseId,
            userId: userId
        }).populate('userId');

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

     
        const expenseAmount = expense.Amount;
        const newTotalExpense = Math.max(expense.userId.TotalExpense - expenseAmount, 0);

       
        await Promise.all([                                                                                    // Update user's TotalExpense and delete the expense
            Users.findByIdAndUpdate(userId, { TotalExpense: newTotalExpense }),                     
            Expense.findOneAndDelete({ _id: expenseId })
        ]);

        res.status(200).json({ expense: 'deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.editExp = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        const updatedAmount = parseFloat(req.body.Amount);
        const updatedDescription = req.body.Description;
        const updatedCategory = req.body.Category;
        const updatedIncome = req.body.Income;

        const expense = await Expense.findOne({
            _id: expenseId,
            userId: req.users._id
        }).populate('userId');

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        const amountDifference = updatedAmount - expense.Amount;

        // Update the expense fields
        expense.Amount = updatedAmount;
        expense.Description = updatedDescription;
        expense.Category = updatedCategory;
        expense.Income = updatedIncome;

        // Update the user's total expense
        const user = expense.userId;
        const currentTotalExpense = parseFloat(user.TotalExpense || 0);
        const newTotalExpense = Math.max(currentTotalExpense + amountDifference, 0);

        // Save the updated expense and user
        await Promise.all([
            expense.save(),
            Users.findByIdAndUpdate(user._id, { TotalExpense: newTotalExpense })
        ]);

        res.status(200).json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.download = async (req, res, next) => {
    try {
        const Expenses = await Expense.find({ userId: req.users._id });
        const dataTostring = JSON.stringify(Expenses)
        const UserId = req.users._id
        const filename = `Expense${UserId}/${new Date()}`;
        const fileUrl = await S3services.UploadtoS3(dataTostring, filename)
        await Reports.create({
            ExpenseReport: fileUrl, userId: req.users._id
        })
        res.status(200).json({ fileUrl: fileUrl });


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }

}

exports.downloadOldreports = async (req, res, next) => {
    try {
        const Report = await Reports.find({ userId: req.users._id })

        res.status(200).json({ reports: Report });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }

}




