const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const handleError = require('../functions/error-handler')

const Todo = require('../models/Todo')
const User = require('../models/User')

User.hasMany(Todo)
Todo.belongsTo(User)

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

		if (errors.length > 0) handleError('Invalid input data.', 400, errors)

		const existingUser = await User.findOne({ where: { email } })
		if (existingUser !== null) handleError('User already exists!', 400)

		const hashedPass = await bcrypt.hash(password, 12)
		const user = await User.create({ email, password: hashedPass })
		console.log(user)
		return user
	},

	loginUser: async function ({ userInput }, req) {
		const { email, password } = userInput
		const user = await User.findOne({ where: { email } })

		if (user === null) handleError('Invalid email or password', 400)

		const isEqual = await bcrypt.compare(password, user.password)
		if (!isEqual) handleError('Invalid email or password', 400)

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
		return req.isAuth
	},

	todos: async function (args, req) {
		if (!req.isAuth) handleError('Unauthenticated', 401)

		try {
			const todos = await Todo.findAll({ where: { userId: req.userId } })
			return todos.map(todo => ({
				...todo.dataValues,
				createdAt: todo.dataValues.createdAt.toISOString(),
				updatedAt: todo.dataValues.updatedAt.toISOString(),
			}))
		} catch (error) {
			console.log(error)
			return error
		}
	},

	todo: function ({ id }, req) {
		return { id: 1, title: 'first' }
	},
	user: function ({ id }, req) {
		return { id: 2, username: 'TestUser' }
	},

	createTodo: async function ({ todoInput }, req) {
		if (!req.isAuth) handleError('Unauthenticated!', 401)
		try {
			const { title, completed, dueDate, dueTime } = todoInput
			const todo = await Todo.create({
				title,
				completed,
				dueDate,
				dueTime,
				userId: req.userId,
			})
			return todo
		} catch (error) {
			console.log(error)
			return error
		}
	},

	updateTodo: async function ({ id, todoInput }, req) {
		if (!req.isAuth) handleError('Unauthenticated', 401)
		try {
			const todo = await Todo.findOne({ where: { userId: req.userId } })
			if (todo === null) handleError('No Todo found', 404)

			await Todo.update(todoInput, { where: { id } })
			const updatedTodo = await Todo.findOne({ where: { id } })
			return updatedTodo
		} catch (error) {
			console.log(error)
			return error
		}
	},

	deleteTodo: async function ({ id }, req) {
		if (!req.isAuth) handleError('Unauthenticated', 401)
		try {
			const todo = await Todo.findOne({ where: { userId: req.userId } })
			if (!todo) handleError('No Todo found', 404)

			await Todo.destroy({ where: { id } })
			return true
		} catch (error) {
			console.log(error)
			return error
		}
	},
}
