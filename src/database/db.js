const dotenv = require('dotenv')
dotenv.config()

const { Pool } = require('pg')

const pool = new Pool({
	host:		process.env.DB_HOST,
	port:		process.env.DB_PORT,
	database:	process.env.DB_NAME,
	user:		process.env.DB_USER,
	password:	process.env.DB_PASSWORD

})


const createConnection = async ()=>{
	try{
		console.log("Trying to connect with database...")
		const start = Date.now()
		await pool.connect()
		const end = Date.now() - start
		console.log("Connected")

		return { connectionTime: end }
	}catch(err){
		throw err
	}
}


module.exports = { createConnection }

