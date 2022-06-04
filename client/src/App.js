import React from 'react'
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

const App = () => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        paddingLeft: '40px',
        paddingRight: '40px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/clubs' element={<Layout />}>
            <Route index element={<Clubs />} />
            <Route path=':id' element={<Club />} />
            <Route path='add' element={<AddClub />} />
            <Route path='edit/:id' element={<EditClub />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
