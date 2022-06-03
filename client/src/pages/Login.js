import React from 'react'
import {useState, useRef, useEffect} from 'react'

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  // Set focus on the first input
  useEffect(() => {
    userRef.current.focus()
  }, [])

  // Empty out error message
  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

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
          id='email'
          ref={userRef}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='email'
          required
        />
        <input
          value={password}
          id='password'
          ref={userRef}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='password'
          required
        />
        <input type='submit' value='register' />
        <p>{errMsg}</p>
      </form>
    </>
  )
}

export default Login
