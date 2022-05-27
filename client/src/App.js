import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Form from './components/Form'
import Clubs from './components/Clubs'

const App = () => {
  const [clubData, setClubData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/`)
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
      <Form setClubData={setClubData} />
      {isLoading && <div>Loading </div>}
      {!isLoading && <Clubs clubData={clubData} />}
    </>
  )
}

export default App
