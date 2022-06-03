import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {AddClub, EditClub, Clubs, AddShot, EditShot, Shots} from './pages/index'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/clubs' element={<Clubs />} />
        <Route path='/clubs/addclub' element={<AddClub />} />
        <Route path='/clubs/editclub' element={<EditClub />} />
        <Route path='/shots' element={<Shots />} />
        <Route path='/shots/addshot' element={<AddShot />} />
        <Route path='/shots/editshot' element={<EditShot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
