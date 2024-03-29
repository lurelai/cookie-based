const { readFileSync } = require('fs')
const { Pool } = require('pg')
const { join } = require('path')
const dotenv = require('dotenv')

dotenv.config()


const pool = new Pool({
	host:		process.env.DB_HOST,
	port:		process.env.DB_PORT,
	database:	process.env.DB_NAME,
	user:		process.env.DB_USER,
	password:	process.env.DB_PASSWORD

})

// create tables
pool.query(readFileSync(join(__dirname, 'create-table.sql'), "ASCII"))

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

const query = async (queryString, params)=>{
	const result = await pool.query(queryString, params)

	return result
}


module.exports = { createConnection, query }

