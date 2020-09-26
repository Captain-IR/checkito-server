module.exports = function handleError(message, status, data = null) {
	const error = new Error(message)
	error.status = status
	error.data = data
	throw error
}
