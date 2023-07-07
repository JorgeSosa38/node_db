const Sequelize = require('sequelize');

let database = '';
let username = 'root';
let password = '997688';

const config=new Sequelize(database,username,password,{dialect: 'mariadb'});

module.exports=config;