const express = require('express')
const app = express()
const port = 3001
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Club = require('./models/Club.js')
dotenv.config({path: '../.env'})
let cors = require('cors')

app.use(cors())

const connectDataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://deakn:${process.env.MONGO_DB_PW}@club-data.3pa1p.mongodb.net/Club-Data?retryWrites=true&w=majority`
    )
    console.log('conncted')
  } catch (err) {
    console.log(err)
  }
}
connectDataBase()

app.get('/', async (req, res) => {
  const data = await Club.find({})
  console.log(data)
  res.send(data)
})

app.get('/insert', async (req, res) => {
  const club = new Club({club: '8 Iron'})
  await club.save()
  res.send('Data inserted')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
