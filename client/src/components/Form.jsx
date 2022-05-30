import React, {useState} from 'react'
import axios from 'axios'

const Form = ({setClubData}) => {
  const [clubName, setClub] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post('http://localhost:3001/clubs', {
        clubName: clubName,
        yards: [],
        totalShots: 0,
      })
      setClubData(result.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (e) => {
    setClub(e.target.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Club' onChange={handleChange} />
      <button onClick={handleSubmit}>Add Club</button>
    </form>
  )
}

export default Form
