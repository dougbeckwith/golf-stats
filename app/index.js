const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('dotenv').config()
let cors = require('cors')
var path = require('path')

let port = process.env.PORT
if (port == null || port == '') {
  port = 3001
}
console.log('test')
const connectDataBase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`)
    console.log('Connected to database')
  } catch (err) {
    console.log(err)
  }
}
connectDataBase()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})

app.use('/clubs', require('./routes/clubRoutes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
