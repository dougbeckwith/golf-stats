import React, {useState} from 'react'
import axios from 'axios'

const AddShotInput = ({club, setClubData}) => {
  const [shot, setShot] = useState()
  const handleSubmit = async (id) => {
    const result = await axios.patch(`http://localhost:3001/clubs/${id}`, {
      shot: parseInt(shot),
      club: club,
    })
    setClubData(result.data)
  }
  const handleChange = (e) => {
    setShot(e.target.value)
  }
  return (
    <>
      <input type='text' placeholder='Club' onChange={handleChange} />
      <button onClick={() => handleSubmit(club._id)}>Add Shot</button>
    </>
  )
}

export default AddShotInput
