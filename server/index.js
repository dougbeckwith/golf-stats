const express = require('express')
const app = express()
const port = 3001
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path: '../.env'})
let cors = require('cors')

const connectDataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://deakn:${process.env.MONGO_DB_PW}@club-data.3pa1p.mongodb.net/Club-Data?retryWrites=true&w=majority`
    )
    console.log('Connected to database')
  } catch (err) {
    console.log(err)
  }
}
connectDataBase()

app.use(cors())
app.use(express.json())

app.use('/clubs', require('./routes/clubRoutes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
