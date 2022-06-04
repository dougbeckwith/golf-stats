import React from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState, useEffect} from 'react'
const EditClub = () => {
  let params = useParams()
  console.log(params)

  const navigate = useNavigate()
  const [clubName, setClubName] = useState('')
  const [clubBrand, setClubBrand] = useState('')
  const [nameMessage, setNameMessage] = useState(false)
  const [brandMessage, setBrandMessage] = useState(false)

  const navigateToClubs = () => {
    navigate('/clubs')
  }

  // Simple Check to see if input is empty
  const inputValid = (input) => {
    if (input !== '') {
      return true
    } else {
      if (input === clubBrand) {
        setBrandMessage(true)
      }
      if (input === clubName) {
        setNameMessage(true)
      }
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inputValid(clubName) && inputValid(clubBrand)) {
      try {
        const result = await axios.patch('http://localhost:3001/clubs', {
          clubName: clubName,
          brand: clubBrand,
          yards: [],
          totalShots: 0,
        })
        console.log(result)
        setClubName('')
        setClubBrand('')
        navigateToClubs()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleNameChange = (e) => {
    setNameMessage(false)
    setClubName(e.target.value)
  }
  const handleBrandChange = (e) => {
    setBrandMessage(false)
    setClubBrand(e.target.value)
  }

  const handleCancel = () => {
    navigate('/clubs')
  }
  return (
    <>
      <form style={{marginTop: '40px'}}>
        <div style={{padding: '15px'}}>
          <input type='text' onChange={handleNameChange} placeholder='Club' />
          {nameMessage && <div>Enter Club Name</div>}
        </div>
        <div style={{padding: '15px'}}>
          <input type='text' onChange={handleBrandChange} placeholder='Brand' />
          {brandMessage && <div>Enter Brand Name</div>}
        </div>
        <div style={{padding: '15px'}}>
          <button onClick={handleSubmit}>Add CLub</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  )
}

export default EditClub
