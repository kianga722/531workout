import React from 'react'
import {
  Link
} from 'react-router-dom'
const Nav = ({
  user,
  handleLogout
}) => {
  return (
    <div id='nav-main'>
      <Link to="/">Home</Link>
        {
          user === null ? <Link to="/login">Login</Link> : <div>{user.email} logged in</div>
        }
        {
          user === null && <Link to="/signup">Signup</Link>
        }
        {
          user &&
          <button
            onClick={(event) => handleLogout(event)}
          >
            Logout
          </button>
        }
    </div>
  )
}

export default Nav