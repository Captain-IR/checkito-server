'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('todos', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			dueDate: Sequelize.DATEONLY,
      dueTime: Sequelize.TIME,
      userId: Sequelize.INTEGER,

			createdAt: Sequelize.DATE,
			updatedAt: Sequelize.DATE,
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('todos')
	},
}
