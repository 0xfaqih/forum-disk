import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveLeaderboardsActionCreator } from '../leaderboards/action';
import { receiveThreadActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThread();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboard = await api.getLeaderboards();

      dispatch(receiveLeaderboardsActionCreator(leaderboard));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  asyncPopulateUsersAndThreads,
  asyncLeaderboards,
};
