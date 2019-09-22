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
  
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>

        <div>
          Email
          <input
            id='emailForgot'
            type='email'
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <button type="submit">Request Password Reset</button>

      </form>

    </div>
  )
}


export default ForgotPassword