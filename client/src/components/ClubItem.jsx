import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const ClubItem = ({club, setClubData}) => {
  const id = club._id

  const handleDelete = async () => {
    try {
      const result = await axios.delete(`http://localhost:3001/clubs/${id}`)
      setClubData(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = () => {
    console.log(`edit ${id}`)
  }

  return (
    <>
      <div style={{padding: '10px'}}>
        <p>{club.clubName}</p>
        <p>{club.brand}</p>
        <Link to={`/clubs/edit/${id}`}>
          <button>Edit CLub</button>
        </Link>
        <button onClick={handleDelete}>Delete CLub</button>
      </div>
    </>
  )
}

export default ClubItem
