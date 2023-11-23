const path=require('path');
const fs=require('fs')
const express = require('express')
const cors=require('cors')
const helmet=require('helmet')
const mongoose=require('mongoose')
const morgan=require('morgan')
const app = express();
require('dotenv').config();



//routes import
const HomeRoutes = require('./routes/home');
const SignRoutes=require('./routes/sign');
const LoginRoutes=require('./routes/login');
const PurchaseRoutes=require('./routes/purchase');
const PremiumFeatRoutes=require('./routes/premiumFeatures');
const PasswordRoutes=require('./routes/Password')



const accesslogStream=fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'})

//middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());
app.use(express.json())
app.use(morgan('combined',{stream:accesslogStream}))

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"
  );
  next();
});

//controllers middlewares
app.use(HomeRoutes);
app.use(SignRoutes);
app.use(LoginRoutes);
app.use(PurchaseRoutes);
app.use(PremiumFeatRoutes);
app.use(PasswordRoutes);





//server config

mongoose
.connect('mongodb+srv://shreyash:H7Z2qpPGBq0PEX5v@test1.uhi7exl.mongodb.net/?retryWrites=true&w=majority')
.then(result=>{
    app.listen(5000, () => {
        console.log(`Server is running on port 5000`);
    });
})
.catch(err=>{
    console.log(err);
})


