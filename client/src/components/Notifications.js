import React from 'react'

const Notification = ({
  message
}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notifications">

      {
        typeof message === 'string' &&
        <div className='notification'>
          {message}
        </div>
      }

      { typeof message !== 'string' &&
        message.map(error => (
          <div key={message.indexOf(error)} className='notification'>
            {error}
          </div>
        ))
      }

    </div>
  )
}

export default Notification