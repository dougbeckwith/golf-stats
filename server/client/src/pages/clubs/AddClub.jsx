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
      <div className='min-h-screen flex flex-col'>
        <div className='container max-w-[600px] mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <div className='bg-white px-6 py-8 rounded shadow-xl border-2 text-black w-full'>
            <h1 className='pb-5 text-2xl'>Add Club</h1>
            <form>
              <div>
                <label htmlFor='club'>Club</label>
                <input
                  id='club'
                  style={{padding: '15px'}}
                  type='text'
                  onChange={handleNameChange}
                  className='block border-2 w-full p-3 rounded focus:outline-none focus:border-slate-400  focus:ring-slate-400'
                  placeholder='Club'
                />
                <p
                  className={
                    nameMessage ? 'text-xs h-4 text-red-600' : 'invisible h-4'
                  }>
                  Please a enter brand
                </p>
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
                  className='block border-2 w-full p-3 rounded focus:outline-none focus:border-slate-400  focus:ring-slate-400'
                  placeholder='Brand'
                />

                <p
                  className={
                    brandMessage ? 'text-xs h-4 text-red-600' : 'invisible h-4'
                  }>
                  Please a enter brand
                </p>
              </div>

              <button
                onClick={handleSubmit}
                className='mt-4 w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1'>
                Add Club
              </button>
              <button
                onClick={handleCancel}
                className='mt-4 w-full text-center py-3 rounded bg-red-600 text-white hover:bg-red-500 focus:outline-none my-1'>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddClub
