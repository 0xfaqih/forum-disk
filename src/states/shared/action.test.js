import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveThreadActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const fakeThreadRespone = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'Technology',
    createdAt: '2021-06-22T08:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUserResponse = [
  {
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asynPopulateUsersAndThread thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._gerAllThread = api.getAllThread;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThread = api._getAllThread;

    delete api._getAllUsers;
    delete api._getAllThread;
  });

  it('should dispatch action correctly when data fecthing is success', async () => {
    api.getAllUsers = () => Promise.resolve(fakeUserResponse);
    api.getAllThread = () => Promise.resolve(fakeThreadRespone);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadActionCreator(fakeThreadRespone));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fecthing failed', async () => {
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThread = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
