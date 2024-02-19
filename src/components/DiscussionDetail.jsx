import React from 'react';
import PropTypes from 'prop-types';
import {
  BiLike, BiDislike, BiSolidLike, BiSolidDislike,
} from 'react-icons/bi';
import { MdOutlineInsertComment } from 'react-icons/md';
import postedAt from '../utils';

function DiscussionDetail({
  id, title, body, category, createdAt, owner,
  like, dislike, authUser, upVotesBy, downVotesBy, comments,
}) {
  const isThreadLiked = upVotesBy.includes(authUser);
  const isThreadDisliked = downVotesBy.includes(authUser);

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
    <section className="discussion-detail">
      <header>
        <img src={owner.avatar} alt={owner.id} />
        <div className="discussion-detail-info">
          <h3 className="discussion-detail-user">{owner.name}</h3>
          <p className="discussion-detail-date">{postedAt(createdAt)}</p>
        </div>
      </header>
      <article>
        <h3 className="discussion-detail-title">{title}</h3>
        <p className="discussion-detail-body" dangerouslySetInnerHTML={{ __html: body }} />
        <h4 className="discussion-detail-category">
          #
          {category}
        </h4>
      </article>
      <footer>
        {
               like && (
               <div className="discussion-detail-like">
                 <p>
                   <span aria-label="like" onClick={onLikeClick}>
                     {isThreadLiked ? <BiSolidLike /> : <BiLike />}
                   </span>
                   {' '}
                   {upVotesBy.length}
                 </p>
               </div>
               )
            }
        <div className="discussion-detail-like">
          <p>
            <span aria-label="dislike" onClick={onDislikeClick}>
              {isThreadDisliked ? <BiSolidDislike /> : <BiDislike />}
            </span>
            {' '}
            {downVotesBy.length}
          </p>
        </div>
        <div className="discussion-detail-comment">
          <p>
            <span>
              <MdOutlineInsertComment />
            </span>
            {' '}
            {comments.length}
          </p>
        </div>
      </footer>
    </section>
  );
}

DiscussionDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  like: PropTypes.func,
  dislike: PropTypes.func,
  authUser: PropTypes.string.isRequired, // eslint-disable-next-line react/forbid-prop-types
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

DiscussionDetail.defaultProps = {
  like: null,
  dislike: null,
};

export default DiscussionDetail;
