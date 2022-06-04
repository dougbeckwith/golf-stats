import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import ClubItem from '../../components/ClubItem'
import ClubList from '../../components/ClubList'
import {Link} from 'react-router-dom'

const Clubs = ({clubData, setClubData, isLoading, setIsLoading}) => {
  // const [isLoading, setIsLoading] = useState(true)
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
    <>
      <h1>Clubs</h1>
      <Link to='/clubs/add'>
        <button>Add CLub</button>
      </Link>

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
    </>
  )
}

export default Clubs
