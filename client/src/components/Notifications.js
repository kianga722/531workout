import React from 'react'

const Notification = ({
  node,
  message,
  setNotificationMessage,

}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notifications-wrapper'>

      <div className='popup-background'></div>

      <section
        className="notifications"
        ref={node}
      >

        <div
          className='notification-close-wrapper'>
          <div
            className='notification-close'
            onClick={(event) => setNotificationMessage(null)}
          >
            X
          </div>
        </div>

        {
          typeof message === 'string' &&
          <div className='notification'>
            {message}
          </div>
        }

        { typeof message !== 'string' &&
          message.map(error => (
            <div key={message.indexOf(error)} className='notification-list'>
              &#8226; {error}
            </div>
          ))
        }

      </section>

    </div>
  )
}

export default Notification