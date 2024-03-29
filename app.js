const express = require('express')
const app = express()
const { randomUUID } = require('node:crypto')

// Connect with database
const { createConnection, query } = require('./src/database/db')

createConnection().then(async (time)=>{
	console.log("Connection time: " + time.connectionTime + "ms")
}).catch(err=>{ console.log(err) })

// Allow body-parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('trust proxy', true)


app.get('/', (req, res)=>{
	return res.send(`
		<form action="/login" method="post">
			<input type="text" name="id" placeholder="id">
			<input type="password" name="password" placeholder="user password">
			<input type="submit">
		</form>
	`)
})

app.post('/login', async (req, res)=>{
	// Possibles [{id: 1, password: mama}, {id: 2, password: mia}, {id: 3, password: figaro}]
	const { id, password } = req.body

	if((id === "1" && password === "mama") || (id === "2" && password === "mia") || (id === "3" && password === "figaro")){
		const ip = req.ip
		const userAgent = req.header('user-agent')
		const session = randomUUID()

		const queryString = "INSERT INTO sessions(user_agent, user_id, user_session, user_ip) VALUES ($1, $2, $3, $4)"
		
		await query(queryString, [userAgent, id, session, ip])

		return res.send("logged")
	}

	return res.send("not logged")
})

app.listen(8000)

