import React from 'react';
import PropTypes from 'prop-types';
import DiscussionCommentItem from './DiscussionCommentItem';

function DiscussionComments({ comments, like, dislike }) {
  return (
    <div className="comments">
      <h3>
        {comments.length}
        {' '}
        Komentar
      </h3>
      {
            comments.map((comment) => (
              <DiscussionCommentItem
                key={comment.id} // eslint-disable-next-line react/jsx-props-no-spreading
                {...comment}
                like={like}
                dislike={dislike}
              />
            ))
         }
    </div>
  );
}

DiscussionComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default DiscussionComments;
