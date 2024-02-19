import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncAddComment, asyncReceiveThreadDetail, asyncToggleDislikeCommentThread,
  asyncToggleDislikeThreadDetail, asyncToggleLikeCommentThread, asyncToggleLikeThreadDetail,
} from '../states/threadDetail/action';
import DiscussionDetail from '../components/DiscussionDetail';
import DiscussionReplyInput from '../components/DiscussionReplyInput';
import DiscussionComments from '../components/DiscussionComments';

function DetailPage() {
  const { id } = useParams();
  const {
    threadDetail = null,
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onLikeThread = () => {
    dispatch(asyncToggleLikeThreadDetail());
  };

  const onDislike = () => {
    dispatch(asyncToggleDislikeThreadDetail());
  };

  const onCommentLike = (commentId) => {
    dispatch(asyncToggleLikeCommentThread(commentId));
  };

  const onCommentDislike = (commentId) => {
    dispatch(asyncToggleDislikeCommentThread(commentId));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ content }));
  };

  if (!threadDetail) {
    return null;
  }

  const comments = threadDetail.comments.map((comment) => ({
    ...comment,
    authUser: authUser.id,
  }));

  return (
    <section className="detail-page">
      <DiscussionDetail
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...threadDetail}
        authUser={authUser.id}
        like={onLikeThread}
        dislike={onDislike}
      />
      <DiscussionComments
        comments={comments}
        like={onCommentLike}
        dislike={onCommentDislike}
      />
      <DiscussionReplyInput
        addComment={onAddComment}
      />
    </section>
  );
}

export default DetailPage;
