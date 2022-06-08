import React from 'react'
import {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {
  AddClub,
  EditClub,
  Clubs,
  Club,
  Landing,
  Login,
  NotFound,
  Register,
  Layout,
} from './pages/index'
import axios from 'axios'

const App = () => {
  const [clubData, setClubData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // Call Server to get Club Data
    const getAllClubData = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_URL}/clubs`)
        setClubData(result.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getAllClubData()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/clubs' element={<Layout />}>
          <Route
            index
            element={
              <Clubs
                clubData={clubData}
                setClubData={setClubData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path=':id'
            element={
              <Club
                clubData={clubData}
                setClubData={setClubData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path='add'
            element={
              <AddClub
                clubData={clubData}
                setClubData={setClubData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path='edit/:id'
            element={
              <EditClub
                clubData={clubData}
                setClubData={setClubData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
