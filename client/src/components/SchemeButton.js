import React from 'react';

const SchemeButton = ({
  scheme,
  setScheme,
}) => (
  <div className="scheme-wrapper">
    <button
      id="schemeChange"
      onClick={(event) => {
        if (scheme === null) {
          return setScheme('redScheme');
        }
        return setScheme(null);
      }}
     />
  </div>

);


export default SchemeButton;
