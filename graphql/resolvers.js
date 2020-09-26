const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Todo = require('../models/Todo')
const User = require('../models/User')

module.exports = {
	createUser: async function ({ userInput }, req) {
		const { email, password } = userInput
		const errors = []

		if (!validator.isEmail(email)) {
			errors.push({ message: 'Email is invalid.' })
		}

		if (validator.isEmpty(password) || !validator.isLength(password, { min: 6 })) {
			errors.push({ message: 'Password too short!' })
		}

		if (errors.length > 0) {
			const error = new Error('Invalid input data.')
			error.data = errors
			error.status = 422
			throw error
		}

		const existingUser = await User.findOne({ where: { email } })
		if (existingUser !== null) {
			const error = new Error('User already exists!')
			throw error
		}

		const hashedPass = await bcrypt.hash(password, 12)
		const user = await User.create({ email, password: hashedPass })
		console.log(user)
		return user
	},

	loginUser: async function ({ userInput }, req) {
		const { email, password } = userInput
		const user = await User.findOne({ where: { email } })

		if (user === null) {
			const error = new Error('Invalid email or password')
			error.code = 401
			throw error
		}

		const isEqual = await bcrypt.compare(password, user.password)
		if (!isEqual) {
			const error = new Error('Invalid email or password')
			error.code = 401
			throw error
		}

		const token = jwt.sign(
			{
				userId: user.id,
				email: user.email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		)

		return token
	},

	me: async function (args, req) {
		console.log(req.isAuth);
		return req.isAuth
	},

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
		} catch (err) {}
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
