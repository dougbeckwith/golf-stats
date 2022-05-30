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
  return (
    <>
      <Container className='pt-3'>
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
          <ClubCard
            clubData={clubData}
            setClubData={setClubData}
            // addShotHandleShow={addShotHandleShow}
          />
        )}
      </Container>
    </>
  )
}

export default App
