const mongoose = require('mongoose')
const {Schema} = mongoose

const clubSchema = new Schema({
  clubName: String,
  brand: String,
  yards: Array,
  totalShots: Number,
  goal: Number,
})

const Club = mongoose.model('Club', clubSchema)
module.exports = Club
