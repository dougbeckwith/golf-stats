import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddClub = () => {
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
        const result = await axios.post('http://localhost:3001/clubs', {
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
      <h1>Add Club</h1>
      <form style={{paddingTop: '0px'}}>
        <div style={{paddingTop: '10px'}}>
          <label htmlFor='club' style={{display: 'block'}}>
            Club
          </label>
          <input
            id='club'
            style={{padding: '15px'}}
            type='text'
            onChange={handleNameChange}
            placeholder='Club'
          />
          {nameMessage && (
            <div style={{color: 'red', paddingTop: '10px'}}>
              Please enter club name
            </div>
          )}
        </div>
        <div style={{paddingTop: '10px'}}>
          <label htmlFor='brand' style={{display: 'block'}}>
            Brand
          </label>
          <input
            id='brand'
            style={{padding: '15px'}}
            type='text'
            onChange={handleBrandChange}
            placeholder='Brand'
          />
          {brandMessage && (
            <div style={{color: 'red', paddingTop: '10px'}}>
              Please enter brand name
            </div>
          )}
        </div>
        <div style={{paddingTop: '10px'}}>
          <button onClick={handleSubmit}>Add CLub</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  )
}

export default AddClub
