import React from 'react'

const Clubs = () => {
  return <div>Clubs</div>
}

export default Clubs

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
