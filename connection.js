const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URI)

sequelize
	.authenticate()
	.then(() => [console.log('[+] Database connected')])
	.catch(() => {
		console.error('[!] Unable to connect to the database:', err)
	})

module.exports = sequelize
