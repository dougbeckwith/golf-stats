import React from 'react'
import axios from 'axios'

const ShotItem = ({id, shot, setClub, club, setAvgYards, getAverageYards}) => {
  const handlePatch = async () => {
    try {
      const result = await axios.patch(`http://localhost:3001/clubs/${id}`, {
        deleteShot: shot,
        club: club,
        shot: null,
        shotId: id,
      })
      console.log(result)
      setClub(result.data)
      setAvgYards(getAverageYards(result.data))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <p>Yards: {shot.yards}</p>
      <button onClick={handlePatch}>Delete</button>
    </>
  )
}

export default ShotItem
