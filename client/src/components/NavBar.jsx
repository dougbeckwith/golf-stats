import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#6cf',
        height: '75px',
      }}>
      <div>Golf Stats</div>
      <Link to='/clubs'>
        <button>Clubs</button>
      </Link>
      <Link to='/login'>
        <button>Login</button>
      </Link>
      <Link to='/register'>
        <button>Register</button>
      </Link>
    </div>
  )
}

export default NavBar
