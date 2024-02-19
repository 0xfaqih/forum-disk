import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  TOGGLE_DISLIKE_THREAD: 'TOGGLE_DISLIKE_THREAD',
  FILTER_THREAD_BY_CATEGORY: 'FILTER_THREAD_BY_CATEGORY',
};

function receiveThreadActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function filterThreadsByCategoryActionCreator(category) {
  return {
    type: ActionType.FILTER_THREAD_BY_CATEGORY,
    payload: {
      category,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleLikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleLikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.toggleLikeThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function toggleDislikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncToggleDislikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleDislikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.toggleDislikeThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDislikeThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadActionCreator,
  filterThreadsByCategoryActionCreator,
  toggleLikeThreadActionCreator,
  asyncToggleLikeThread,
  toggleDislikeThreadActionCreator,
  asyncToggleDislikeThread,
  addThreadActionCreator,
  asyncAddThread,
};
