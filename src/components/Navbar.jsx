import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Navbar({ authUser }) {
  const { id, avatar, name } = authUser || {};

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Dicoding Forum</h1>
      </div>
      <div className="navbar-right">
        {authUser ? (
          <div className="navbar-info">
            <p>{name}</p>
            <img src={avatar} alt={id} title={name} />
          </div>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </div>
    </nav>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navbar.propType = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navbar;
