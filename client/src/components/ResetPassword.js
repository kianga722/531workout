import React, {useEffect} from 'react'
import {
  Route
} from 'react-router-dom'

const ResetPassword = ({
  setNotificationMessage,
  emailReset,
  handleSubmit,
  handlePasswordChange,
  handlePassword2Change,
  password,
  password2,
}) => {

  const resetForm = () => (
    <Route render={({ history }) => (

      <form>

        <div className='form-wrapper'>
          <div className='form-title'>
            Password
          </div>
          <input
            id='passwordForgot'
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
            id='password2Forgot'
            type='password'
            value={password2}
            onChange={handlePassword2Change}
          />
        </div>

        <div className='submit-wrapper'>
          <input
            className='submit-button'
            type='submit'
            onClick={(e) => handleSubmit(e, history)}
            value='Update Password'
          >
          </input>
        </div>

      </form>

    )} />
  )

  useEffect(() => {
    return () => {
      setNotificationMessage(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id='forgotPassword'>
  
      <h2>Reset Password for {emailReset}</h2>

      {
        resetForm()
      }

    </div>
  )
}


export default ResetPassword