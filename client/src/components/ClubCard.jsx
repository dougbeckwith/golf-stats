import {Button, Card, ProgressBar, Stack} from 'react-bootstrap'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import {useState} from 'react'
import AddShotModal from './AddShotModal'

export default function BudgetCard({clubData, setClubData}) {
  // Add shot modal state
  const [showAddShotModal, setshowAddShotModal] = useState(false)
  const addShotHandleClose = () => setshowAddShotModal(false)
  const addShotHandleShow = () => setshowAddShotModal(true)

  const handleDelete = async (id) => {
    const newData = await axios.delete(`http://localhost:3001/clubs/${id}`)
    setClubData(newData.data)
  }
  const getAverageYards = (club) => {
    let totalYards = 0
    let shots = club.totalShots
    if (shots === 0) {
      return 0
    } else {
      club.yards.forEach((shot) => {
        totalYards += shot
      })
      return totalYards / shots
    }
  }
  return clubData.map((club) => {
    const averageYards = getAverageYards(club)
    const key = uuidv4()
    const id = club._id
    return (
      <Card key={key} className='mb-2'>
        <Card.Body>
          <div className='fs-3 d-flex justify-content-between align-items-baseline fw-normal'>
            <div className='me-2'>{club.clubName}</div>
            <div className='text-muted fs-4'>{club.brand}</div>
          </div>

          <div className='d-flex flex-column pb-2'>
            <div className='m-0'>Average Shot : {averageYards} Yards</div>
            <div className='m-0'>Longest Shot: 200 Yards</div>
            <div className='m-0'>Total Shots: {club.totalShots}</div>
          </div>

          <div className='m-1 fs-6'>Goal 100/200 Yards</div>
          <ProgressBar
            className='rounded-pill'
            // variant={getProgressBarVariant(amount, max)}
            min={0}
            max={1000}
            now={500}
          />
          <Stack direction='horizontal' gap='2' className='mt-4 flex flex-wrap'>
            <AddShotModal
              showAddShotModal={showAddShotModal}
              addShotHandleClose={addShotHandleClose}
              addShotHandleShow={addShotHandleShow}
              setClubData={setClubData}
            />
            <Button
              onClick={() => console.log('View shots')}
              variant='outline-secondary'>
              View Shots
            </Button>
            <Button onClick={() => handleDelete(id)} variant='outline-danger'>
              Delete Club
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    )
  })
}
