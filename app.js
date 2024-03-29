const express = require('express')
const app = express()

// Connect with database
const { createConnection } = require('./src/database/db')

createConnection().then(async (time)=>{
	console.log("Connection time: " + time.connectionTime + "ms")
}).catch(err=>{ console.log(err) })

app.get('/', (req, res)=>{
	return res.send(`
		<form action="/login" method="post">
			<input type="text" name="id" placeholder="id">
			<input type="password" name="password" placeholder="user password">
			<input type="submit">
		</form>
	`)
})

app.post('/login', (req, res)=>{
	return res.send({okay: 'okay'})
})

app.listen(8000)

