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

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <div>
          Email
          <input
            id='email'
            type='email'
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div>
          Password
          <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button type="submit">Login</button>

      </form>

      <div className='links'>
        <div className='links-forgot'>
          <Link to="/forgot">Forgot password?</Link>
        </div>
        <div className='links-register'>
          No account? <Link to="/signup">Signup here</Link>
        </div>
        <div className='links-resend'>
          Problems activating your account? <Link to="/resend">Resend Email Confirmation</Link>
        </div>
      </div>
      
    </div>
  )
}

export default LoginForm