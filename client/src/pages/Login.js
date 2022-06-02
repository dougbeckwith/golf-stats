import React from 'react'
import {useState} from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()
    if (data.user) {
      alert('login success')
      window.location.href = '/dashboard'
    } else {
      alert('check password and username')
    }
    console.log(data)
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='email'
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='password'
        />
        <input type='submit' value='register' />
      </form>
    </>
  )
}

export default Login
