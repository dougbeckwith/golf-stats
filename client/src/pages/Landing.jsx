import React from 'react'
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
    <div>
      <div>SIGN UP FOR GOLF APP</div>
      <Link to='/login'>
        <button>Login</button>
      </Link>
      <Link to='/register'>
        <button>Register</button>
      </Link>
    </div>
  )
}

export default Landing
