import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_LIKE_THREAD_DETAIL: 'TOGGLE_LIKE_THREAD_DETAIL',
  TOGGLE_DISLIKE_THREAD_DETAIL: 'TOGGLE_DISLIKE_THREAD_DETAIL',
  TOGGLE_LIKE_COMMENT_THREAD: 'TOGGLE_LIKE_COMMENT_THREAD',
  TOGGLE_DISLIKE_COMMENT_THREAD: 'TOGGLE_DISLIKE_COMMENT_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
};

function receiveThreadDetailActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      detailThread,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleLikeThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDislikeThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleLikeCommentThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDislikeCommentThreadActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeThreadDetailActionCreator(authUser.id));

    try {
      await api.toggleLikeThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleDislikeThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(toggleDislikeThreadDetailActionCreator(authUser.id));

    try {
      await api.toggleDislikeThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleLikeCommentThread(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeCommentThreadActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.toggleLikeCommentTread(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeCommentThreadActionCreator({ commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncToggleDislikeCommentThread(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(toggleDislikeCommentThreadActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.toggleDislikeCommentThread(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDislikeCommentThreadActionCreator({ commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ content = '' }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { threadDetail } = getState();
    try {
      const comment = await api.createComment({ threadId: threadDetail.id, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleLikeThreadDetailActionCreator,
  toggleDislikeThreadDetailActionCreator,
  toggleLikeCommentThreadActionCreator,
  toggleDislikeCommentThreadActionCreator,
  addCommentActionCreator,
  asyncToggleDislikeThreadDetail,
  asyncReceiveThreadDetail,
  asyncToggleLikeThreadDetail,
  asyncToggleLikeCommentThread,
  asyncToggleDislikeCommentThread,
  asyncAddComment,
};
