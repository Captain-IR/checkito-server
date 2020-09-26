require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')

const path = require('path')
const logger = require('morgan')

const auth = require('./middleware/auth')

const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
	'/graphql',
	auth,
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue: graphqlResolver,
		graphiql: true,
	})
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500).json({ message: err.message })
})

PORT = process.env.PORT || 5000

app.listen(PORT, async () => {
	console.log(`Listing on port ${PORT}`)
})
