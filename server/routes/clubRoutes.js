const express = require('express')
const router = express.Router()

const {
  addClub,
  getClubs,
  updateClub,
  getClubById,
  deleteClubById,
} = require('../controllers/clubController')

router.post('/', addClub)
router.get('/', getClubs)
router.patch('/:id', updateClub)
router.get('/:id', getClubById)
router.delete('/:id', deleteClubById)

module.exports = router
