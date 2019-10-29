import React from 'react';
import ContextWrapper from './components/ContextWrapper'
import SchemeContextProvider from './contexts/SchemeContext';
import LoadingContextProvider from './contexts/LoadingContext';
import AuthContextProvider from './contexts/AuthContext';
import NotificationContextProvider from './contexts/NotificationContext';

function App() {
  return (
    <SchemeContextProvider>
      <LoadingContextProvider>
        <NotificationContextProvider>
          <AuthContextProvider>
            <ContextWrapper />
          </AuthContextProvider>
        </NotificationContextProvider>
      </LoadingContextProvider>
    </SchemeContextProvider>
  )
}

export default App;
