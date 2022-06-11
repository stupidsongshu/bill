const express = require('express')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')
const router = require('./router')

const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use(cookieParser())

// app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))

app.use('/api', router)

app.use('/', (req, res) => {
  res.send('hello express')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`)
})