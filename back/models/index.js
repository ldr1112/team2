const Sequelize = require('sequelize');
const { sequelize } = require('./connection');

const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config')[env];
const User = require('./user');

const db = {};
// const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

// model 생성
db.User = User;

User.init(sequelize);

// User.associate(db)

module.exports = db;
