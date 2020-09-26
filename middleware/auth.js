var jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization')
	if (!authHeader) {
		req.isAuth = false
		return next()
	}
	const token = authHeader.split(' ')[1]
	let decoded
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET)
	} catch (err) {
		req.isAuth = false
		return next()
	}

	if (!decoded) {
		req.isAuth = false
		return next()
	}

	req.userId = decoded.userId
	req.isAuth = true
	next()
}
