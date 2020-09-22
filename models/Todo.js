const Sequelize = require('sequelize')
const { sequelize } = require('../app')

module.exports = sequelize.define('todo', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},

	title: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},

	dueDate: Sequelize.STRING,
	dueTime: Sequelize.STRING,
})
