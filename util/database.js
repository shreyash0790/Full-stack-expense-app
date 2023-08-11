const Sequelize= require('sequelize');

const sequelize=new Sequelize('node-complete','root','nodepro',
{dialect:'mysql',host:'localhost'});

module.exports=sequelize;