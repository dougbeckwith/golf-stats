import React, {useState} from 'react'
import axios from 'axios'

const Form = ({setClubData}) => {
  const [club, setClub] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/clubs', {club: club})
      setClubData((prevData) => {
        return [...prevData, {club: club}]
      })
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
