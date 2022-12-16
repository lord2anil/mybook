const connectTOmongo=require('./db')
connectTOmongo();
const express = require('express')


const app = express()
const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(express.json())
// Available Routes
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})