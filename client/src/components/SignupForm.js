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

      <h2>Create your account now</h2>

      <form>

        <div className='form-wrapper'>
          <div className='form-title'>
            Email
          </div>
          <input
            id='emailSignup'
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
            id='passwordSignup'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className='form-wrapper'>
          <div className='form-title'>
            Confirm Password
          </div>
          <input
            id='password2Signup'
            type='password'
            value={password2}
            onChange={handlePassword2Change}
          />
        </div>

        <div className='submit-wrapper'>
          <input
            className='submit-button'
            type='submit'
            onClick={handleSubmit}
            value='Create your account'
          >
          </input>
        </div>
        
      </form>

      <div className='links'>
        <div className='links-login'>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
        <div className='links-resend'>
          Problems activating your account? <Link to="/resend">Resend Email Confirmation</Link>
        </div>
      </div>
      
    </div>
  )
}

export default SignupForm