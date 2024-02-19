import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  BiLike, BiDislike, BiSolidLike, BiSolidDislike,
} from 'react-icons/bi';
import { MdOutlineInsertComment } from 'react-icons/md';
import postedAt from '../utils/index';

function DiscussionItem({
  id, title, body, category, createdAt, user, like,
  dislike, authUser, upVotesBy, downVotesBy, totalComments,
}) {
  const navigate = useNavigate();
  const isThreadLiked = upVotesBy.includes(authUser);
  const isThreadDisliked = downVotesBy.includes(authUser);

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onLikeClick = (event) => {
    event.stopPropagation();
    if (!isThreadLiked) {
      like(id);
      if (isThreadDisliked) {
        dislike(id);
      }
    }
  };

  const onDislikeClick = (event) => {
    event.stopPropagation();
    if (!isThreadDisliked) {
      dislike(id);
      if (isThreadLiked) {
        like(id);
      }
    }
  };

  return (
    <div className="discussion-item">
      {' '}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <h3 onClick={onThreadClick}>{title}</h3>
      <div className="user-info">
        <div className="user-profile">
          <img src={user.avatar} alt={user} />
          <p>{user.name}</p>
        </div>
        <p>{postedAt(createdAt)}</p>
      </div>
      <div className="discussion-short">
        <p dangerouslySetInnerHTML={{ __html: body.length > 110 ? `${body.substring(0, 110)}...` : body }} />
      </div>
      <div className="discussion-info">
        <div className="dicussion-info-inner">
          {
                  like && (
                  <p>
                    <span aria-label="like" onClick={onLikeClick}>
                      {isThreadLiked ? <BiSolidLike /> : <BiLike />}
                    </span>
                    {' '}
                    {upVotesBy.length}
                  </p>
                  )
               }

          {
                  dislike && (
                  <p>
                    <span aria-label="dislike" onClick={onDislikeClick}>
                      {isThreadDisliked ? <BiSolidDislike /> : <BiDislike />}
                    </span>
                    {' '}
                    {downVotesBy.length}
                  </p>
                  )
               }

          <p>
            <span>
              <MdOutlineInsertComment />
            </span>
            {' '}
            {totalComments}
          </p>
        </div>
        <p className="hashtag">
          #
          {category}
        </p>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

DiscussionItem.propTypes = {
  ...threadItemShape,
  like: PropTypes.func,
  dislike: PropTypes.func,
};

DiscussionItem.defaultProps = {
  like: null,
  dislike: null,
};

export { threadItemShape };

export default DiscussionItem;
