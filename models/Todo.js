const Sequelize = require('sequelize')
const { sequelize } = require('../app')

module.exports = sequelize.define('Todo', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
})
