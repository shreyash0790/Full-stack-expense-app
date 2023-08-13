const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const User=sequelize.define('Users',{
 id:{
  type: Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
 },
Name:{
  type: Sequelize.STRING,
  allowNull:false
 },
 Email:{
  type: Sequelize.STRING,
  allowNull:false,
  unique: true
 },
Password:{
  type: Sequelize.STRING,
  allowNull:false

 },
 IsPremiumUser:{
  type:Sequelize.BOOLEAN,
  defaultValue: false // Specify your default value
 },
 TotalExpense:{
  type:Sequelize.FLOAT,
  defaultValue:0
 }
})
module.exports=User;
