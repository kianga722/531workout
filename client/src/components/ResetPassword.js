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

      <form onSubmit={(e) => handleSubmit(e, history)}>

        <div>
          Password
          <input
            id='passwordForgot'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div>
          Confirm Password
          <input
            id='password2Forgot'
            type='password'
            value={password2}
            onChange={handlePassword2Change}
          />
        </div>

        <button type="submit">Update Password</button>

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