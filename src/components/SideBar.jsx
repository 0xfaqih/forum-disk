import React from 'react';
import { Link } from 'react-router-dom';
import { GoCommentDiscussion } from 'react-icons/go';
import { FaRankingStar } from 'react-icons/fa6';
import { CiLogout } from 'react-icons/ci';
import { IoMdAdd } from 'react-icons/io';
import PropTypes from 'prop-types'; // Added prop-types import

function SideBar({ signOut }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-menu">
        <ul>
          <li>
            <Link to="/">
              <GoCommentDiscussion />
              {' '}
              <span>Thread</span>
            </Link>
          </li>
          <li>
            <Link to="/leadboard">
              <FaRankingStar />
              {' '}
              <span>Leadboard</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-add-thread">
        <Link to="/new">
          <IoMdAdd />
          <span>Buat Thread</span>
        </Link>
      </div>

      <div className="sidebar-logout">
        <Link onClick={signOut}>
          <CiLogout />
          {' '}
          <span>Keluar</span>
        </Link>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default SideBar;
