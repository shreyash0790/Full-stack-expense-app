const path=require('path');
const express = require('express')
const cors=require('cors')
require('dotenv').config();


const sequelize=require('./util/database');


const app = express();
const HomeRoutes = require('./routes/home');
const SignRoutes=require('./routes/sign');
const LoginRoutes=require('./routes/login');
const PurchaseRoutes=require('./routes/purchase');
const Expense=require('./models/home')
const User=require('./models/sign')
const Orders=require('./models/Orders');


app.use(cors());

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(HomeRoutes);
app.use(SignRoutes);
app.use(LoginRoutes);
app.use(PurchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Orders);
Orders.belongsTo(User);




sequelize
.sync()
.then(result=>{
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err=>{
    console.log(err);
})