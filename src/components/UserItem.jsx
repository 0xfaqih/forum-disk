import React from 'react';
import PropTypes from 'prop-types';

function UserItem({ user, score, rank }) {
  return (
    <div className="user-item">
      <span className="user-item-rank">{rank}</span>
      <img className="user-item-img" src={user.avatar} alt={user.id} />
      <p className="user-item-name">{user.name}</p>
      <p className="user-item-xp">
        {score}
        <span>xp</span>
      </p>
    </div>
  );
}

UserItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  user: PropTypes.shape({
    avatar: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  }), // eslint-disable-next-line react/require-default-props
  score: PropTypes.number, // eslint-disable-next-line react/require-default-props
  rank: PropTypes.number,
};

export default UserItem;
