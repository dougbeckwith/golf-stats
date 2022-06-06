import React from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState, useEffect} from 'react'
const EditClub = ({setIsLoading, isLoading}) => {
  const params = useParams()
  const id = params.id

  const navigate = useNavigate()
  const [club, setClub] = useState('')
  const [clubName, setClubName] = useState('')
  const [clubBrand, setClubBrand] = useState('')
  const [nameMessage, setNameMessage] = useState(false)
  const [brandMessage, setBrandMessage] = useState(false)

  useEffect(() => {
    const fetchClub = async () => {
      const result = await axios.get(`http://localhost:3001/clubs/${id}`)
      console.log(result)
      setClub(result.data)
      setClubName(result.data.clubName)
      setClubBrand(result.data.brand)
      setIsLoading(false)
    }
    fetchClub()
  }, [])

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
        await axios.patch(`http://localhost:3001/clubs/${id}`, {
          clubName: clubName,
          clubBrand: clubBrand,
          shot: null,
          totalShots: null,
          club: club,
          deleteShot: null,
        })
        setClubName('')
        setClubBrand('')
        navigateBack()
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

  const navigateBack = () => {
    navigate(`/clubs/${id}`)
  }
  return (
    <>
      <h1>Edit Club</h1>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <form style={{marginTop: '0px'}}>
          <div style={{paddingTop: '15px'}}>
            <label htmlFor='club' style={{display: 'block'}}>
              Club
            </label>
            <input
              id='club'
              type='text'
              value={clubName}
              onChange={handleNameChange}
              placeholder='Club'
            />
            {nameMessage && (
              <div style={{color: 'red', paddingTop: '10px'}}>
                Please enter club Nnme
              </div>
            )}
          </div>
          <div style={{paddingTop: '15px'}}>
            <label htmlFor='brand' style={{display: 'block'}}>
              Brand
            </label>
            <input
              id='brand'
              type='text'
              value={clubBrand}
              onChange={handleBrandChange}
              placeholder='Brand'
            />
            {brandMessage && (
              <div style={{color: 'red', paddingTop: '10px'}}>
                Please enter brand name
              </div>
            )}
          </div>
          <div style={{paddingTop: '15px'}}>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={navigateBack}>Cancel</button>
          </div>
        </form>
      )}
    </>
  )
}

export default EditClub
