const Sequelize = require('sequelize')
const { sequelize } = require('../app')

module.exports = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},

	username: {
		type: Sequelize.STRING,
    allowNull: false,
    unique: true,
	},

	password: {
    type: Sequelize.STRING,
    allowNull: false,
	},
})
