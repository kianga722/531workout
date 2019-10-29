import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

const LoadingContextProvider = (props) => {
  // Loading
  const [contentLoading, setContentLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ contentLoading, setContentLoading }}>
      {props.children}
    </LoadingContext.Provider>
  )
}


export default LoadingContextProvider;