const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL)

sequelize
	.authenticate()
	.then(() => [console.log('[+] Database connected')])
	.catch(() => {
		console.error('[!] Unable to connect to the database:', err)
	})

module.exports = sequelize
