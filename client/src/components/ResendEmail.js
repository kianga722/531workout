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

      <form>

        <div className='form-wrapper'>
          <div className='form-title'>
            Email
          </div>
          <input
            id='emailResend'
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
            value='Resend Email'
          >
          </input>
        </div>

      </form>

    </div>
  )
}


export default ResendEmail