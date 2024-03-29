const express = require('express')
const app = express()

app.get('/', (req, res)=>{
	return res.send(`
		<form action="/login" method="post">
			<input type="text" name="id" placeholder="id">
			<input type="password" name="password" placeholder="user password">
			<input type="submit">
		</form>
	`)
})

app.listen(8000)

