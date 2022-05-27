import React, {useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
  const [clubData, setClubData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3001/`)
        console.log(result)
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
      {isLoading && <div>Loading </div>}
      {!isLoading &&
        clubData.map((item) => {
          return (
            <>
              <div>{item.club}</div>
              <div>{item._id}</div>
            </>
          )
        })}
    </>
  )
}

export default App
