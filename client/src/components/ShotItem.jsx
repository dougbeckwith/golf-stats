import React from 'react'
import axios from 'axios'

const ShotItem = ({id, shot, setClub, club}) => {
  const handlePatch = async () => {
    try {
      const result = await axios.patch(`http://localhost:3001/clubs/${id}`, {
        deleteShot: shot,
        club: club,
        shot: null,
      })
      console.log(result)
      setClub(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <p>Yards: {shot}</p>
      <button onClick={handlePatch}>Delete</button>
    </>
  )
}

export default ShotItem
