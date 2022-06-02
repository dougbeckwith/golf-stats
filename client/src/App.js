import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import 'bootstrap/dist/css/bootstrap.min.css'
import ClubCard from './components/ClubCard'
import AddClubModal from './components/AddClubModal'

const App = () => {
  const [clubData, setClubData] = useState([])

  // Fetch club data from database state
  const [isLoading, setIsLoading] = useState(true)

  // Add club modal state
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    // Get club data from database and club data state
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/clubs`)
        console.log(result.data)
        setClubData(result.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerUser = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    const data = await response.json()
    console.log(data)
  }
  return (
    <>
      <div className='bg-light min-vh-100'>
        <Container className='pt-3'>
          <h1>Register</h1>
          <form onSubmit={registerUser}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              placeholder='name'
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='email'
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='password'
            />
            <input type='submit' value='register' />
          </form>
          <Stack direction='horizontal' gap='2' className='mb-4'>
            <h1 className='me-auto'>Golf Tracker</h1>
            <AddClubModal
              show={show}
              handleClose={handleClose}
              handleShow={handleShow}
              setClubData={setClubData}
            />
          </Stack>

          {isLoading && <div>Loading </div>}
          {!isLoading && (
            <ClubCard clubData={clubData} setClubData={setClubData} />
          )}
        </Container>
      </div>
    </>
  )
}

export default App
