import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Clubs from './pages/Clubs'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Clubs />} />
        {/* <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
