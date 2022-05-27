const express = require('express')
const app = express()
const port = 3001
const dotenv = require('dotenv')
dotenv.config({path: '../.env'})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`${process.env.TEST}Example app listening on port ${port}`)
})
