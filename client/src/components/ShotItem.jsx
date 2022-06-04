import React from 'react'
// import axios from 'axios'
// import {Link} from 'react-router-dom'

const ShotItem = (club, setClubData) => {
  const id = club._id

  const handleDelete = () => {
    console.log('delete shot', `id: ${id}`)
  }

  return (
    <>
      <p>Shot 1 {id}</p>
      <button onClick={handleDelete}>Delete</button>
    </>
  )
}

export default ShotItem
