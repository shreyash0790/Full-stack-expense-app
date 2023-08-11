const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Orders=sequelize.define('Orders',{
 id:{
  type: Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
 },
PaymentId:{
  type: Sequelize.STRING,
  allowNull:false
 },
OrderId:{
  type: Sequelize.STRING,
  allowNull:false,
  unique: true
 },
Status:{
  type: Sequelize.STRING,
  allowNull:false

 },
})
module.exports=Orders;