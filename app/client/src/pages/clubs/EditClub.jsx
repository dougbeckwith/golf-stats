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
      const result = await axios.get(`${process.env.REACT_APP_URL}/clubs/${id}`)
      setClub(result.data)
      setClubName(result.data.clubName)
      setClubBrand(result.data.brand)
      setIsLoading(false)
    }
    fetchClub()
    // eslint-disable-next-line
  }, [])

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
        await axios.patch(`${process.env.REACT_APP_URL}/clubs/${id}`, {
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
                    value={clubName}
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
                    value={clubBrand}
                    onChange={handleBrandChange}
                    className='block border-2 w-full p-3 rounded focus:outline-none focus:border-slate-400  focus:ring-slate-400'
                    placeholder='Brand'
                  />

                  <p
                    className={
                      brandMessage
                        ? 'text-xs h-4 text-red-600'
                        : 'invisible h-4'
                    }>
                    Please a enter brand
                  </p>
                </div>
                <button
                  onClick={handleSubmit}
                  className='mt-4 w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1'>
                  Submit
                </button>
                <button
                  onClick={navigateBack}
                  className='mt-4 w-full text-center py-3 rounded bg-red-600 text-white hover:bg-red-500 focus:outline-none my-1'>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ;<form style={{marginTop: '0px'}}>
//   <div style={{paddingTop: '15px'}}>
//     <label htmlFor='club' style={{display: 'block'}}>
//       Club
//     </label>
//     <input
//       id='club'
//       type='text'
//       value={clubName}
//       onChange={handleNameChange}
//       placeholder='Club'
//     />
//     {nameMessage && (
//       <div style={{color: 'red', paddingTop: '10px'}}>
//         Please enter club Nnme
//       </div>
//     )}
//   </div>
//   <div style={{paddingTop: '15px'}}>
//     <label htmlFor='brand' style={{display: 'block'}}>
//       Brand
//     </label>
//     <input
//       id='brand'
//       type='text'
//       value={clubBrand}
//       onChange={handleBrandChange}
//       placeholder='Brand'
//     />
//     {brandMessage && (
//       <div style={{color: 'red', paddingTop: '10px'}}>
//         Please enter brand name
//       </div>
//     )}
//   </div>
//   <div style={{paddingTop: '15px'}}></div>
// </form>

export default EditClub
