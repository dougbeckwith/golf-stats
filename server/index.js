const express = require('express')
const app = express()
const port = 3001
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Club = require('./models/Club.js')
dotenv.config({path: '../.env'})
let cors = require('cors')
const e = require('express')

// Need to connect front end to backend
app.use(cors())
// Need for incoming data in the req.body
app.use(express.json())

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

app.get('/clubs', async (req, res) => {
  const data = await Club.find({})
  res.send(data)
})

app.post('/clubs', async (req, res) => {
  const data = req.body
  const club = new Club(data)
  await club.save()
  const newClubData = await Club.find({})
  res.send(newClubData)
})

app.delete('/clubs/:id', async (req, res) => {
  const id = req.params.id
  await Club.findByIdAndDelete(id)
  const data = await Club.find({})
  res.send(data)
})

app.patch('/clubs/:id', async (req, res) => {
  const id = req.params.id
  const shot = req.body.shot
  const goal = req.body.goal
  const club = req.body.club
  console.log(shot)
  console.log(goal)
  console.log(club)

  if (shot !== undefined) {
    // const club = await Club.find({_id: id})
    await Club.findOneAndUpdate(
      {_id: id},
      {yards: [...club.yards, shot], totalShots: club.totalShots + 1}
    )
  } else {
    await Club.findOneAndUpdate({_id: id}, {goal: goal})
  }
  const data = await Club.find({})
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
