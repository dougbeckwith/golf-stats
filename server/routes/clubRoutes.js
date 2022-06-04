const express = require('express')
const router = express.Router()

const {
  addClub,
  getClubs,
  updateClub,
  getClubById,
  deleteClubById,
} = require('../controllers/clubController')

// Routes
router.get('/', getClubs)
router.get('/:id', getClubById)
router.post('/', addClub)
router.patch('/:id', updateClub)
router.delete('/:id', deleteClubById)

module.exports = router
