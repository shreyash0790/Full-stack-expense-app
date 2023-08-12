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
  defaultValue: 'Null' // Specify your default value

 },
OrderId:{
  type: Sequelize.STRING,
 },
Status:{
  type: Sequelize.STRING,

 },
})
module.exports=Orders;