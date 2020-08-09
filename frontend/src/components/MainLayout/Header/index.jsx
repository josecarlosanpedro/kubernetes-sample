import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
const Header = props => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    window.location = 'login'
  }
  const handleHome = () => {
    props.history.push('/home')
  }
  const handleAdded = () => {
    props.history.push('/added')
  }
    const { isLoggedIn } = props
    return (
      <header className="header-section">
        <div>
          {isLoggedIn && 
          <>
              <button onClick={handleHome}>Home</button>
              <button onClick={handleAdded}>Added</button>
          </>
          }
          {isLoggedIn && <button className="logout-btn" onClick={handleLogout}>Log Out</button>}
        </div>
      </header>
    );
  }


Header.propTypes = propTypes;
export default withRouter(Header);
