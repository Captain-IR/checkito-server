const Todo = require('../models/Todo')
const User = require('../models/User')

module.exports = {
	todo: function () {
		return { id: 1, title: 'first' }
	},
	user: function () {
		return { id: 2, username: 'TestUser' }
	},

	createTodo: async function ({ todoInput }, req) {
    try {
      const { title, completed, dueDate, dueTime } = todoInput
      
			const todo = await Todo.create({ title, completed, dueDate, dueTime })

			return todo
		} catch (err) {
			throw new Error(err.message)
		}
	},
}
