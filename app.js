const path=require('path');
const express = require('express')
const cors=require('cors')


const sequelize=require('./util/database');

const app = express();
const HomeRoutes = require('./routes/home');
const SignRoutes=require('./routes/sign');
const LoginRoutes=require('./routes/login');

app.use(cors());

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(HomeRoutes);
app.use(SignRoutes);
app.use(LoginRoutes);


sequelize
.sync()
.then(result=>{
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
      });
})
.catch(err=>{
    console.log(err);
})