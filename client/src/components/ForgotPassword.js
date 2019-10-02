import React, {useEffect} from 'react'

const ForgotPassword = ({
  setNotificationMessage,
  handleSubmit,
  handleEmailChange,
  email
}) => {

  useEffect(() => {
    return () => {
      setNotificationMessage(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id='forgotPassword'>
  
      <h2>Reset your password</h2>

      <form>

        <div className='form-wrapper'>
          <div className='form-title'>
            Email
          </div>
          <input
            id='emailForgot'
            type='email'
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className='submit-wrapper'>
          <input
            className='submit-button'
            type='submit'
            onClick={handleSubmit}
            value='Send reset password email'
          >
          </input>
        </div>
        
      </form>

    </div>
  )
}


export default ForgotPassword