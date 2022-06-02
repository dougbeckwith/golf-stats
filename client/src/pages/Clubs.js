import React from 'react'
import {Container, Stack} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import axios from 'axios'
import AddClubModal from '../components/AddClubModal'
import ClubCard from '../components/ClubCard'

const Clubs = () => {
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
      <div className='bg-light min-vh-100'>
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
            <ClubCard clubData={clubData} setClubData={setClubData} />
          )}
        </Container>
      </div>
    </>
  )
}

export default Clubs
