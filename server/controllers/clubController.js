const Club = require('../models/Club')

// @route GET /clubs
// @desc Get All clubs
// @access Private
const getClubs = async (req, res) => {
  try {
    const data = await Club.find({})
    res.send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Sever Error')
  }
}

// @route POST /clubs
// @desc Add club
// @access Private
const addClub = async (req, res) => {
  try {
    const data = req.body
    const newClub = new Club(data)
    await newClub.save()
    const newClubData = await Club.find({})
    res.send(newClubData)
  } catch {
    console.log(err)
    res.status(500).send('Sever Error')
  }
}

// @route PUT /clubs/:id
// @desc Update clubs
// @access Private
const updateClub = async (req, res) => {
  const id = req.params.id
  const {clubName, clubBrand, shot, club} = req.body
  if (clubName && clubBrand) {
    try {
      await Club.findByIdAndUpdate(id, {
        clubName: clubName,
        brand: clubBrand,
      })
      res.send('Success')
    } catch (err) {
      console.log(err)
      res.status(500).send('Server Error')
    }
  }
  if (shot !== null) {
    await Club.findOneAndUpdate(
      {_id: id},
      {yards: [...club.yards, shot], totalShots: club.totalShots + 1}
    )
    const data = await Club.find({})
    res.send(data)
  }
}

// @route GET /clubs/:id
// @desc Get club by id
// @access Private
const getClubById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Club.findById(id)
    res.send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Sever Error')
  }
}

// @route DELETE /clubs/:id
// @desc Delete club by id
// @access Private
const deleteClubById = async (req, res) => {
  try {
    const id = req.params.id
    await Club.findByIdAndDelete(id)
    const data = await Club.find({})
    res.send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Sever Error')
  }
}

// const updateClub = async (req, res) => {
//   console.log('test')
//   try {
//     const {shot, goal, club} = req.body
//     const id = club._id
//     if (shot) {
//       await Club.findOneAndUpdate(
//         {_id: id},
//         {yards: [...club.yards, shot], totalShots: club.totalShots + 1}
//       )
//       const data = await Club.find({})
//       res.send(data)
//     }
//     if (goal) {
//       await Club.findOneAndUpdate({_id: id}, {goal: goal})
//       const data = await Club.find({})
//       res.send(data)
//     }
//   } catch (err) {
//     console.log(err)
//     res.status(500).send('Server Error')
//   }
// }

module.exports = {
  addClub,
  getClubs,
  updateClub,
  getClubById,
  deleteClubById,
}
