const Todo = require('../models/Todo')
const User = require('../models/User')

module.exports = {
	todos: async function (args, req) {
		const todos = await Todo.findAll()
		// console.log(todos)
		return todos.map(todo => ({
			...todo.dataValues,
			createdAt: todo.dataValues.createdAt.toISOString(),
			updatedAt: todo.dataValues.updatedAt.toISOString(),
		}))
	},

	todo: function ({ id }, req) {
		return { id: 1, title: 'first' }
	},
	user: function ({ id }, req) {
		return { id: 2, username: 'TestUser' }
	},

	createTodo: async function ({ todoInput }, req) {
		// console.log(todoInput);
		try {
			const { title, completed, dueDate, dueTime } = todoInput
			const todo = await Todo.create({ title, completed, dueDate, dueTime })
			return todo
		} catch (err) {
			console.log(err)
		}
	},

	updateTodo: async function ({ id, todoInput }, req) {
		const todo = await Todo.findOne({ where: { id } })
		if (!todo) {
			const error = new Error('No Todo found')
			error.status = 404
			return error
		}
		await Todo.update(todoInput, { where: { id } })
		return todo
	},

	deleteTodo: async function ({ id }, req) {
		const todo = await Todo.findOne({ where: { id } })
		if (!todo) {
			const error = new Error('No Todo found')
			error.status = 404
			return error
		}
		await Todo.destroy({ where: { id } })
		return true
	},
}
