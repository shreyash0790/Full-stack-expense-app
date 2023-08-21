const path=require('path');
const express = require('express')
const cors=require('cors')
require('dotenv').config();


const sequelize=require('./util/database');


const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const HomeRoutes = require('./routes/home');
const SignRoutes=require('./routes/sign');
const LoginRoutes=require('./routes/login');
const PurchaseRoutes=require('./routes/purchase');
const PremiumFeatRoutes=require('./routes/premiumFeatures');
const PasswordRoutes=require('./routes/Password')

const Expense=require('./models/home')
const User=require('./models/sign')
const Orders=require('./models/Orders');
const PasswordReset=require('./models/PasswordReset')
const ExpenseReport=require('./models/Reports')



app.use(cors());

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"
  );
  next();
});


app.use(HomeRoutes);
app.use(SignRoutes);
app.use(LoginRoutes);
app.use(PurchaseRoutes);
app.use(PremiumFeatRoutes);
app.use(PasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Orders);
Orders.belongsTo(User);

User.hasMany(PasswordReset);
PasswordReset.belongsTo(User);

User.hasMany(ExpenseReport);
ExpenseReport.belongsTo(User);




sequelize
.sync()
.then(result=>{
    app.listen(5000, () => {
        console.log(`Server is running on port 5000`);
    });
})
.catch(err=>{
    console.log(err);
})