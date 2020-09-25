const Sequelize = require('sequelize')
const sequelize = require('../connection');


module.exports = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},

	email: {
		type: Sequelize.STRING,
    allowNull: false,
    unique: true,
	},

	password: {
    type: Sequelize.STRING,
    allowNull: false,
	},
})
