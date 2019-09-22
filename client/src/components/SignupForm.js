import React, {useEffect} from 'react'
import {
  Link
} from 'react-router-dom'

const SignupForm = ({
  setNotificationMessage,
  handleSubmit,
  handleEmailChange,
  handlePasswordChange,
  handlePassword2Change,
  email,
  password,
  password2
}) => {

  useEffect(() => {
    return () => {
      setNotificationMessage(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id='signup'>

      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>

        <div>
          Email
          <input
            id='emailSignup'
            type='email'
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div>
          Password
          <input
            id='passwordSignup'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div>
          Confirm Password
          <input
            id='password2Signup'
            type='password'
            value={password2}
            onChange={handlePassword2Change}
          />
        </div>

        <button type="submit">Signup</button>

      </form>

      <div className='links'>
        <div className='links-login'>
          Already have an account? <Link to="/login">Login</Link>
        </div>
        <div className='links-resend'>
          Problems activating your account? <Link to="/resend">Resend Email Confirmation</Link>
        </div>
      </div>
      
    </div>
  )
}

export default SignupForm