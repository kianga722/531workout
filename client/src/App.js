import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Route, Redirect,
} from 'react-router-dom'

import Loading from './components/Loading'
import Nav from './components/Nav'
import Notifications from './components/Notifications'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import ResendEmail from './components/ResendEmail'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import WorkoutHome from './components/WorkoutHome'

import axios from 'axios';


function App() {
  // Loading
  const [contentLoading, setContentLoading] = useState(true)

  // Notification Messages
  const [notificationMessage, setNotificationMessage] = useState(null)
  const node = useRef();

  // User
  const [user, setUser] = useState(null)

  // Login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Signup
  const [emailSignup, setEmailSignup] = useState('')
  const [passwordSignup, setPasswordSignup] = useState('')
  const [password2Signup, setPassword2Signup] = useState('')

  // Resend Email
  const [emailResend, setEmailResend] = useState('')

  // Forgot Password
  const [emailForgot, setEmailForgot] = useState('')

  // Reset Password
  const [emailReset, setEmailReset] = useState(null)
  const [passwordReset, setPasswordReset] = useState('')
  const [password2Reset, setPassword2Reset] = useState('')

  // Notifications Popup Handle Clicks
  const handleClick = e => {
    if (node.current && node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setNotificationMessage(null)
  };

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      setContentLoading(true)
      const response = await axios.post('/api/login', {email, password})
      const user = response.data

      await localStorage.clear()
      setUser(user)
    } catch (err) {
      setNotificationMessage(err.response.data)
      setPassword('')
    }
    setContentLoading(false)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      await axios.get('/api/login/logout')
      await localStorage.clear()
      setUser(null)
      setEmail('')
      setPassword('')
    } catch (err) {
      setNotificationMessage(err.response.data)
    }
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/users', {
        email: emailSignup,
        password: passwordSignup,
        password2: password2Signup
      })

      setNotificationMessage(response.data)
      setEmailSignup('')
      setPasswordSignup('')
      setPassword2Signup('')
    } catch (err) {
      setNotificationMessage(err.response.data)
      setPasswordSignup('')
      setPassword2Signup('')
    }
  }

  const handleResend = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/users/resend', {
        email: emailResend,
      })

      setNotificationMessage(response.data)
    } catch (err) {
      setNotificationMessage(err.response.data)
    }
  }

  const handleForgot = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/users/forgot', {
        email: emailForgot,
      })

      setNotificationMessage(response.data)
    } catch (err) {
      setNotificationMessage(err.response.data)
    }
  }

  const handleReset = async (event, history) => {
    event.preventDefault()

    const tokenForgot = window.location.pathname.split('/').pop()
    try {
      const response = await axios.post(`/api/users/reset/${tokenForgot}`, {
        email: emailReset,
        password: passwordReset,
        password2: password2Reset,
      })

      //window.location.pathname = '/login'
      history.push('/login')
      setNotificationMessage(response.data)
    } catch (err) {
      setNotificationMessage(err.response.data)
    }
  }

  const jwtCheck = async () => {
    try {
      // console.log('Checking for valid jwt token...')
      const response = await axios.get('/api/login/jwtCheck')
      const userFound = response.data

      if (userFound) {
        setUser(userFound)
      } 
    } catch (err) {
      // Don't care about errors here
      // console.log(err.response.data)
    }
    setContentLoading(false)
  }

  const jwtVerifyCheck = async () => {
    try {
      // console.log('EMAIL VERIFY Checking for valid jwt token...')
      const response = await axios.get('/api/login/jwtCheck')
      const userFound = response.data

      if (userFound) {
        setUser(userFound)
        setNotificationMessage('Cannot verify a user while another user is already signed in')
      } else {
        const tokenEmail = window.location.pathname.split('/').pop()

        const responseVerify = await axios.get(`/api/users/verify/${tokenEmail}`)
        const userVerifyFound = responseVerify.data

        await localStorage.clear()
        setUser(userVerifyFound)
        
        setNotificationMessage('Email successfully verified!')
        window.history.pushState("", "", '/workouts');
      }
    } catch (err) {
      setNotificationMessage(err.response.data)
      window.history.pushState("", "", '/resend');
    }
    setContentLoading(false)
  }

  const jwtResetCheck = async () => {
    try {
      // console.log('FORGOT PASSWORD Checking for valid jwt token...')
      const response = await axios.get('/api/login/jwtCheck')
      const userFound = response.data

      if (userFound) {
        setUser(userFound)
        setNotificationMessage('Cannot reset password while another user is signed in')
      } else {
        const tokenForgot = window.location.pathname.split('/').pop()

        const responseForgot = await axios.get(`/api/users/reset/${tokenForgot}`)
        const emailFound = responseForgot.data

        setEmailReset(emailFound)
      }
    } catch (err) {
      setNotificationMessage(err.response.data)
      window.history.pushState("", "", '/forgot');
    }
    setContentLoading(false)
  }

  // Check if browser already has JWT token
  useEffect(() => {
    if (window.location.pathname.includes('verify')) {
      jwtVerifyCheck()
    } else if (window.location.pathname.includes('reset')) {
      jwtResetCheck()
    } else {
      jwtCheck()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle popup mouse clicks
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="App">

      <div id='background-gradient'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Router>
        
        {
          contentLoading &&
          <Loading />
        }

        {
          !contentLoading &&
          <section id='container'>

            <Nav 
              user={user}
              handleLogout={handleLogout}
            />

            {
              notificationMessage !== null &&
              <Notifications
                node={node}
                message={notificationMessage}
                setNotificationMessage={setNotificationMessage}
              />
            }
            

            <Route exact path="/" render={() =>
              user === null ?
                <Home
                  setNotificationMessage={setNotificationMessage}
                /> : <Redirect to="/workouts" />
            } />

            <Route path="/login" render={() => 
              user === null ? 
                <LoginForm
                  setNotificationMessage={setNotificationMessage}
                  email={email}
                  password={password}
                  handleEmailChange={({ target }) => setEmail(target.value)}
                  handlePasswordChange={({ target }) => setPassword(target.value)}
                  handleSubmit={handleLogin}
                /> : <Redirect to="/" />
            } />

            <Route path="/signup" render={() => 
              user === null ? 
                <SignupForm
                  setNotificationMessage={setNotificationMessage}
                  email={emailSignup}
                  password={passwordSignup}
                  password2={password2Signup}
                  handleEmailChange={({ target }) => setEmailSignup(target.value)}
                  handlePasswordChange={({ target }) => setPasswordSignup(target.value)}
                  handlePassword2Change={({ target }) => setPassword2Signup(target.value)}
                  handleSubmit={handleSignup}
                /> : <Redirect to="/" />
            } />

            <Route path="/verify/:id" render={() =>           <Redirect to="/resend" />
            } />

            <Route path="/resend" render={() => 
              user === null ? 
                <ResendEmail
                  setNotificationMessage={setNotificationMessage}
                  email={emailResend}
                  handleEmailChange={({ target }) => setEmailResend(target.value)}
                  handleSubmit={handleResend}
                /> : <Redirect to="/" />
            } />

            <Route path="/forgot" render={() =>                user === null ? 
                <ForgotPassword
                  setNotificationMessage={setNotificationMessage}
                  email={emailForgot}
                  handleEmailChange={({ target }) => setEmailForgot(target.value)}
                  handleSubmit={handleForgot}
                /> : <Redirect to="/" />
            } />
            <Route path="/reset/:id" render={() =>            user === null && emailReset !== null ? 
                <ResetPassword
                  setNotificationMessage={setNotificationMessage}
                  emailReset={emailReset}
                  password={passwordReset}
                  password2={password2Reset}
                  handlePasswordChange={({ target }) => setPasswordReset(target.value)}
                  handlePassword2Change={({ target }) => setPassword2Reset(target.value)}
                  handleSubmit={handleReset}
                /> : <Redirect to="/" />
            } />

            <Route path="/workouts" render={() => 
              user ? 
                <WorkoutHome
                  setNotificationMessage={setNotificationMessage}
                  user={user}
                /> : <Redirect to="/login" />
            } />
            
          </section>
        }
        
      </Router>
      
    </div>
    
  );
}

export default App
