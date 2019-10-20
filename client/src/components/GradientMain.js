import React, { useRef } from 'react';


const GradientMain = ({
  nodeGradient,
}) => {

  const handleMouseLeave = (e) => {
    // Reset x and y prop values when no longer hovering
    nodeGradient.current.style.setProperty('--x', 0)
    nodeGradient.current.style.setProperty('--y', 0) 
  };

  return (
    <div
      className='parallax-wrapper'
      ref={nodeGradient}
      onMouseLeave={handleMouseLeave}
    >
      <div id="background-gradient">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
  
}


export default GradientMain;