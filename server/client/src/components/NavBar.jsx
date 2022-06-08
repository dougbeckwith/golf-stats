import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='bg-zinc-200 h-[75px] '>
      <div className='container h-full mx-auto flex justify-between items-center'>
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
    </div>
  )
}

export default NavBar
