import React from 'react';

const SchemeButton = ({
  scheme,
  setScheme,
}) => (
  <div className="scheme-wrapper">
    <button
      id="schemeChange"
      onClick={(event) => {
        if (scheme === '' || scheme === 'fade-in-blue') {
          return setScheme('redScheme fade-in-red');
        }
        return setScheme('fade-in-blue');
      }}
     />
  </div>

);


export default SchemeButton;
