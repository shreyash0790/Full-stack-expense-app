const Sequelize= require('sequelize');
const dotenv = require('dotenv'); 
dotenv.config(); 

const sequelize=new Sequelize(process.env.SEQUELIZE_TABLE_NAME,process.env.SEQUELIZE_USER_NAME,process.env.SEQUELIZE_PASSWORD,
{dialect:'mysql',host:process.env.SEQUELIZE_HOST_NAME});

module.exports=sequelize;