import React from 'react'
import {Link} from 'react-router-dom'

const ClubItem = ({club}) => {
  const id = club._id

  return (
    <>
      <div style={{paddingTop: '10px'}}>
        <p>{club.clubName}</p>
        <p>{club.brand}</p>
        <Link to={`/clubs/${id}`}>
          <button>View</button>
        </Link>
      </div>
    </>
  )
}

export default ClubItem
