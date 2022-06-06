import React from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import ClubItem from '../../components/ClubItem'
import ClubList from '../../components/ClubList'
import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

const Clubs = ({clubData, setClubData, isLoading, setIsLoading}) => {
  useEffect(() => {
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
    // eslint-disable-next-line
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
              <ClubItem key={uuidv4()} club={club} setClubData={setClubData} />
            ))}
          </ClubList>
        </>
      )}
    </>
  )
}

export default Clubs
