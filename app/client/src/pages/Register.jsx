import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {FaCheckSquare} from 'react-icons/fa'

const USER_REGEX = /^.{4,}$/
const PWD_REGEX = /^.{5,}$/
const REGISTER_URL = '/register'

const Register = () => {
  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  }, [user])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    if (pwd === '' && matchPwd === '') {
      setValidMatch(false)
      return
    }
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    console.log('submit')
    e.preventDefault()
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    const matchPw = pwd === matchPwd
    if (!v1 || !v2 || !matchPw) {
      console.log('err')
      setErrMsg('Please enter valid username and password')
      return
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({user, pwd}),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true,
        }
      )
      console.log(response?.data)
      console.log(response?.accessToken)
      console.log(JSON.stringify(response))
      setSuccess(true)
      setUser('')
      setPwd('')
      setMatchPwd('')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken')
      } else {
        setErrMsg('Registration Failed')
      }
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to='/login'>
              <button className=''>Login</button>
            </Link>
          </p>
        </section>
      ) : (
        <div className='min-h-screen flex flex-col'>
          <div className='container max-w-[600px] mx-auto flex-1 flex flex-col items-center justify-center px-2'>
            <div className='bg-white px-6 py-8 rounded shadow-xl border-2 text-black w-full'>
              <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
              <form>
                <div className='flex items-center gap-2'>
                  <label htmlFor='user-name'>Username</label>
                  {validName && (
                    <FaCheckSquare color='rgb(22 163 74 / var(--tw-bg-opacity))' />
                  )}
                </div>
                <input
                  type='text'
                  name='user-name'
                  id='user-name'
                  placeholder='User Name'
                  className='block border-2 w-full p-3 rounded focus:outline-none focus:border-slate-400  focus:ring-slate-400'
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                />
                <p className={!validName ? 'text-xs h-4' : 'invisible h-4'}>
                  Please use 4 or more characters
                </p>
                <div className='pt-2'>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='password'>Password</label>
                    {validPwd && (
                      <FaCheckSquare color='rgb(22 163 74 / var(--tw-bg-opacity))' />
                    )}
                  </div>
                </div>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='block border-2 w-full p-3 rounded focus:outline-none focus:border-slate-400  focus:ring-slate-400'
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                />
                <p className={!validPwd ? 'text-xs h-4' : 'invisible h-4'}>
                  Please use 6 or more characters
                </p>
                <div className='pt-2'>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='confirm-password' className=''>
                      Confirm Password
                    </label>
                    {validMatch && (
                      <FaCheckSquare color='rgb(22 163 74 / var(--tw-bg-opacity))' />
                    )}
                  </div>
                </div>
                <input
                  type='password'
                  id='confirm-password'
                  name='confirm-password'
                  placeholder='Confirm Password'
                  className='block border-2 w-full p-3 rounded focus:outline-none focus:border-slate-400  focus:ring-slate-400'
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                />
                <p className={!validMatch ? 'text-xs h-4' : 'invisible h-4'}>
                  Passwords must match
                </p>

                <button
                  onClick={handleSubmit}
                  className='mt-4 w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-500 focus:outline-none my-1'>
                  Create Account
                </button>
                <p
                  className={
                    !validMatch ? 'text-xs h-4 text-red-600' : 'invisible h-4'
                  }>
                  {errMsg}
                </p>
              </form>
              <div className='text-grey-dark mt-6'>
                Already have an account?
                <Link to='/login'>
                  <button className='w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-blue-500 focus:outline-none my-1'>
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Register
