const mongoose = require('mongoose')
const {Schema} = mongoose

const clubSchema = new Schema({
  clubName: String,
  yards: Array,
  totalShots: Number,
})

const Club = mongoose.model('Club', clubSchema)
module.exports = Club
