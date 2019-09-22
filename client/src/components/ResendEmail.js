import React, {useEffect} from 'react'

const ResendEmail = ({
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
    <div id='resendEmail'>
  
      <h2>Resend Email Activation</h2>

      <form onSubmit={handleSubmit}>

        <div>
          Email
          <input
            id='emailResend'
            type='email'
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <button type="submit">Resend Email</button>

      </form>

    </div>
  )
}


export default ResendEmail