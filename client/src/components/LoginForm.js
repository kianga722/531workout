import React, {useEffect} from 'react'
import {
  Link
} from 'react-router-dom'

const LoginForm = ({
  setNotificationMessage,
  handleSubmit,
  handleEmailChange,
  handlePasswordChange,
  email,
  password
}) => {

  useEffect(() => {
    return () => {
      setNotificationMessage(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id='login'>

      <h2>Welcome back!</h2>

      <form>

        <div className='form-wrapper'>
          <div className='form-title'>
            Email
          </div>
          <input
            id='email'
            type='email'
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className='form-wrapper'>
          <div className='form-title'>
            Password
          </div>
          <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className='submit-wrapper'>
          <input
            className='submit-button'
            type='submit'
            onClick={handleSubmit}
            value='Sign in to your account'
          >
          </input>
        </div>

      </form>

      <div className='links'>
        <div className='links-forgot'>
          <Link to="/forgot">Forgot password?</Link>
        </div>
        <div className='links-register'>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
        <div className='links-resend'>
          Problems activating your account? <Link to="/resend">Resend Email Confirmation</Link>
        </div>
      </div>
      
    </div>
  )
}

export default LoginForm