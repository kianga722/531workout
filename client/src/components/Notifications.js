import React from 'react'

const Notification = ({
  message
}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="errors">

      {
        typeof message === 'string' &&
        <div className='error'>
          {message}
        </div>
      }

      { typeof message !== 'string' &&
        message.map(error => (
          <div key={message.indexOf(error)} className='error'>
            {error}
          </div>
        ))
      }

    </div>
  )
}

export default Notification