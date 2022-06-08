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
        const result = await axios.get(`${process.env.REACT_APP_URL}/clubs`)
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
      <div className=''>
        <div className='container h-full flex gap-4 mx-auto items-center'>
          <h1 className='text-2xl'>Clubs</h1>
          <Link to='/clubs/add'>
            <button className='mt-4 text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1'>
              Add CLub
            </button>
          </Link>
        </div>
      </div>

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
