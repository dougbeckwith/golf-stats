import {Button, Card, ProgressBar, Stack} from 'react-bootstrap'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import {useState} from 'react'
import AddShotModal from './AddShotModal'
import AddGoalModal from './AddGoalModal'

export default function BudgetCard({clubData, setClubData}) {
  // Progress bar state

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
      return (totalYards / shots).toFixed()
    }
  }
  const getGoalYards = (club) => {
    return club.goal
  }
  const isShowProgress = (club) => {
    if (club.goal === 0) {
      return false
    } else {
      return true
    }
  }
  return clubData.map((club) => {
    // Add shot modal state

    // Add goal modal state

    const averageYards = getAverageYards(club)

    const goal = getGoalYards(club)
    const showProgress = isShowProgress(club)
    const key = uuidv4()
    const id = club._id
    return (
      <Card key={key} className='m-0'>
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

          <div className='m-1 fs-6'>Goal: {goal} Yards</div>
          {showProgress && (
            <ProgressBar
              style={{height: 30}}
              className='rounded-pill h-4'
              // variant={getProgressBarVariant(amount, max)}
              min={0}
              max={goal}
              now={averageYards}
              label={`Goal: ${averageYards} / ${goal}`}
            />
          )}

          <Stack direction='horizontal' gap='2' className='mt-4 flex flex-wrap'>
            <AddShotModal
              // showAddShotModal={showAddShotModal}
              // addShotHandleClose={addShotHandleClose}
              // addShotHandleShow={addShotHandleShow}
              setClubData={setClubData}
              club={club}
            />
            <AddGoalModal
              // showGoalModal={showGoalModal}
              // handleCloseGoalModal={handleCloseGoalModal}
              // handleShowGoalModal={handleShowGoalModal}
              setClubData={setClubData}
              club={club}
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
