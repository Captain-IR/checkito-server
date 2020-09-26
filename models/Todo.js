const Sequelize = require('sequelize')
const sequelize = require('../connection')

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
	completed: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	dueDate: Sequelize.STRING,
	dueTime: Sequelize.STRING,
	userId: Sequelize.INTEGER,
})
