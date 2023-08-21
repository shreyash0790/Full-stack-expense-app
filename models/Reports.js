const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Report=sequelize.define('Report',{
 id:{
  type: Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
 },
 ExpenseReport:{
  type:Sequelize.STRING,
 }
})
module.exports=Report;
