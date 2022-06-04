import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import ClubItem from '../../components/ClubItem'
import ClubList from '../../components/ClubList'
import {Link} from 'react-router-dom'

const Clubs = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [clubData, setClubData] = useState([])
  useEffect(() => {
    // Call Server to get Club Data
    const getAllClubData = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/clubs`)
        console.log(result.data)
        setClubData(result.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getAllClubData()
  }, [])

  return (
    <div className='divide-y divide-slate-100'>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <h1>Clubs</h1>
        <Link to='/clubs/add'>
          <button>Add CLub</button>
        </Link>
      </div>

      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <ClubList>
            {clubData.map((club) => (
              <ClubItem key={club._id} club={club} setClubData={setClubData} />
            ))}
          </ClubList>
        </>
      )}
    </div>
  )
}

export default Clubs
