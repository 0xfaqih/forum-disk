import React from 'react';
import PropTypes from 'prop-types';
import {
  BiLike, BiDislike, BiSolidLike, BiSolidDislike,
} from 'react-icons/bi';
import postedAt from '../utils';

function DiscussionCommentItem({
  id, content, createdAt, owner, upVotesBy, downVotesBy, authUser, like, dislike,
}) {
  const isCommentLiked = upVotesBy.includes(authUser);
  const isCommentDisliked = downVotesBy.includes(authUser);

  const onLikeCommentClick = (event) => {
    event.stopPropagation();
    if (!isCommentLiked) {
      like(id);
      if (isCommentDisliked) {
        dislike(id);
      }
    }
  };

  const onDislikeCommentClick = (event) => {
    event.stopPropagation();
    if (!isCommentDisliked) {
      dislike(id);
      if (isCommentLiked) {
        like(id);
      }
    }
  };

  return (
    <div className="comment-item">
      <header>
        <img src={owner.avatar} alt={owner.id} />
        <h4>{owner.name}</h4>
        <p>{postedAt(createdAt)}</p>
      </header>
      <article>
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </article>
      <footer>
        {
                  like && (
                  <div className="discussion-detail-like">
                    <p>
                      <span aria-label="like" onClick={onLikeCommentClick}>
                        {isCommentLiked ? <BiSolidLike /> : <BiLike />}
                      </span>
                      {' '}
                      {upVotesBy.length}
                    </p>
                  </div>
                  )
               }
        {
                  dislike && (
                  <div className="discussion-detail-dislike">
                    <p>
                      <span aria-label="like" onClick={onDislikeCommentClick}>
                        {isCommentDisliked ? <BiSolidDislike /> : <BiDislike />}
                      </span>
                      {' '}
                      {downVotesBy.length}
                    </p>
                  </div>
                  )
               }
      </footer>
    </div>
  );
}

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
};

DiscussionCommentItem.propTypes = {
  ...commentItemShape,
  like: PropTypes.func,
  dislike: PropTypes.func,
};

DiscussionCommentItem.defaultProps = {
  like: null,
  dislike: null,
};

export default DiscussionCommentItem;
