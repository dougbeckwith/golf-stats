import React from 'react'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'

const Clubs = ({clubData, setClubData}) => {
  const handleDelete = async (id) => {
    const newData = await axios.delete(`http://localhost:3001/clubs/${id}`)
    setClubData(newData.data)
  }

  return clubData.map((item) => {
    const key = uuidv4()
    const id = item._id
    return (
      <div key={key}>
        <div>
          {item.club}
          <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
      </div>
    )
  })
}

export default Clubs
