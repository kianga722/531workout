import React from 'react';

const ConfirmPopup = ({
  node,
  message,
  setConfirmPopup,
  handleYes,
}) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="confirmation-wrapper">

      <div className="popup-background" />

      <section
        className="notifications"
        ref={node}
      >

        <div className="notification">
          {message}
        </div>

        <div className="yes-no-wrapper">
          <button
            className="button-yes"
            onClick={handleYes}
          >
            Yes
          </button>
          <button
            className="button-no"
            onClick={(event) => setConfirmPopup(null)}
          >
            No
          </button>
        </div>

      </section>

    </div>
  );
};

export default ConfirmPopup;
