import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
      <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark">
        <div className="container">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <NavLink to="/account" className="nav-item nav-link">Account</NavLink>
              <NavLink to="/breaches" className="nav-item nav-link">Breaches</NavLink>
              <NavLink to="/password" className="nav-item nav-link">Password</NavLink>
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Header
