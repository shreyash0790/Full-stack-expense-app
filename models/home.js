const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Expense=sequelize.define('Expense',{
 id:{
  type: Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
 },
Amount:{
  type: Sequelize.FLOAT,
  allowNull:false
 },
 Description:{
  type: Sequelize.STRING,
  allowNull:false
 },
Category:{
  type: Sequelize.STRING,
  allowNull:false
 },
 Income:{
  type: Sequelize.FLOAT,
  allowNull: false,
 },

})
module.exports=Expense;
