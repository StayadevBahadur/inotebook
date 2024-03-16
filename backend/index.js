const connectToMongo = require('./db')
connectToMongo();

// go to express js web to get example 
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000



app.use(cors())
// middleware to use api request to formate the body json s
app.use(express.json())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`NotesCloud Backend is  listening on http://localhost:${port}`)
})
