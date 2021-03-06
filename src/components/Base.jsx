import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import AuthService from '../modules/AuthService';


const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">User Profile Demo</IndexLink>
      </div>

      {AuthService.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/users">Users</Link>
          <Link to="/edit-profile">Edit Profile</Link>
          <Link to="/logout">Log out</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in</Link>
        </div>
      )}
    </div>
    { /* child component will be rendered here */ }
    {children}
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;