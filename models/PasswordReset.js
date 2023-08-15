const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const PasswordReset=sequelize.define('PasswordReset',{
 id:{
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull:false
 },
IsActive:{
  type: Sequelize.BOOLEAN,
  allowNull:false,
  expiresby: Sequelize.DATE
 }
})
module.exports=PasswordReset;
