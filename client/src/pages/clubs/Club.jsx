import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ShotList from '../../components/ShotList'
import ShotItem from '../../components/ShotItem'
import {v4 as uuidv4} from 'uuid'

const Club = ({setClubData}) => {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id
  const [club, setClub] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [shot, setShot] = useState('')
  // const [avgYards, setAvgYards] = useState(0)
  // const [totalShots, setTotalShots] = useState(0)

  const navigateToClubs = () => {
    navigate('/clubs')
  }
  // const getAverageYards = (club) => {
  //   let totalYards = 0
  //   let shots = club.totalShots
  //   if (shots === 0) {
  //     return 0
  //   } else {
  //     club.yards.forEach((shot) => {
  //       totalYards += parseInt(shot)
  //     })
  //     return (totalYards / shots).toFixed()
  //   }
  // }

  useEffect(() => {
    const fetchClub = async () => {
      const result = await axios.get(`http://localhost:3001/clubs/${id}`)
      setClub(result.data)
      setIsLoading(false)
    }
    fetchClub()
  }, [id])

  const handleDelete = async () => {
    try {
      const result = await axios.delete(`http://localhost:3001/clubs/${id}`)
      setClubData(result.data)
      navigateToClubs()
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddShot = async (e) => {
    e.preventDefault()
    console.log('add shot', id)
    console.log(club, {shot: shot})
    try {
      const result = await axios.patch(`http://localhost:3001/clubs/${id}`, {
        club,
        deleteShot: null,
        shot: shot,
      })
      setClub(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Club</h1>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div style={{paddingTop: '0px'}}>
          <p>{club.clubName}</p>
          <p>{club.brand}</p>
          <p>Avg Yards : </p>
          <p>Total Shots : </p>
          <Link to={`/clubs/edit/${id}`}>
            <button>Edit Club</button>
          </Link>
          <button onClick={handleDelete}>Delete Club</button>
        </div>
      )}
      <h2>Shot List</h2>
      <form>
        <label htmlFor='' style={{display: 'block', paddingBottom: '10px'}}>
          Add Shot
        </label>
        <input
          onChange={(e) => setShot(e.target.value)}
          type='text'
          placeholder='Yards'
          style={{padding: 10}}
        />
        <button onClick={handleAddShot}>Add Shot</button>
      </form>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <ShotList>
          {club.yards.map((shot) => {
            return (
              <ShotItem
                key={uuidv4()}
                id={id}
                setClub={setClub}
                shot={shot}
                club={club}
              />
            )
          })}
        </ShotList>
      )}
    </>
  )
}

export default Club
