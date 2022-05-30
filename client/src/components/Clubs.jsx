import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'
import AddShotInput from './AddShotInput'

const Clubs = ({clubData, setClubData}) => {
  const handleDelete = async (id) => {
    const newData = await axios.delete(`http://localhost:3001/clubs/${id}`)
    setClubData(newData.data)
  }
  const getAverageYards = (club) => {
    let totalYards = 0
    let shots = club.totalShots
    if (shots === 0) {
      return 0
    } else {
      club.yards.forEach((shot) => {
        totalYards += shot
      })
      return totalYards / shots
    }
  }

  return clubData.map((club) => {
    const averageYards = getAverageYards(club)
    const key = uuidv4()
    const id = club._id
    return (
      <div key={key}>
        <div>{club.clubName}</div>
        <div>Shot Total {club.totalShots}</div>
        <div>Avg Yards {averageYards}</div>
        <button onClick={() => handleDelete(id)}>Delete</button>
        <AddShotInput club={club} setClubData={setClubData} />
      </div>
    )
  })
}

export default Clubs
