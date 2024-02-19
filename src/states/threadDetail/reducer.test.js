import { describe, expect, it } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReduceres function', () => {
  it('should return the initian state when given by unkwon action', () => {
    const initialState = [];
    const action = { type: 'UNKWOWN' };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the discussion detail when given by RECEIVE_THREAD_DETAIL', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        detailThread: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
            comments: [{}],
          },
        ],
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it('should clear threadDetail in the Redux store when given by CLEAR_THREAD_DETAIL', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [{}],
      },
    ];

    const action = {
      type: 'CLEAR_THREAD_DETAIL',
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(null);
  });

  it('should return the threadDetail with toggled like threadDetail when given TOGGLE_LIKE_THREAD_DETAIL action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'TOGGLE_LIKE_THREAD_DETAIL',
      payload: {
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).toEqual([action.payload.userId]);

    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });

    const nextState2 = threadDetailReducer(nextState, action);
    expect(nextState2.upVotesBy).toEqual([]);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with toggled dislike threadDetail when given TOGGLE_DISLIKE_THREAD_DETAIL action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'TOGGLE_DISLIKE_THREAD_DETAIL',
      payload: {
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.downVotesBy).toEqual([action.payload.userId]);

    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
    });

    const nextState2 = threadDetailReducer(nextState, action);
    expect(nextState2.downVotesBy).toEqual([]);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with toggled like comment when given TOGGLE_LIKE_COMMENT_THREAD action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],

    };

    const action = {
      type: 'TOGGLE_LIKE_COMMENT_THREAD',
      payload: {
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).toEqual([action.payload.userId]);

    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
        },
      ],
    });

    const nextState2 = threadDetailReducer(nextState, action);
    expect(nextState.upVotesBy).toEqual([]);

    expect(nextState2).toEqual(initialState);
  });

  it('should return the threadDetail with toggled like comment when given TOGGLE_DISLIKE_COMMENT_THREAD action', () => {
   const initialState = {
     id: 'thread-1',
     title: 'Thread Pertama',
     body: 'Ini adalah thread pertama',
     category: 'General',
     createdAt: '2021-06-21T07:00:00.000Z',
     owner: {
       id: 'users-1',
       name: 'John Doe',
       avatar: 'https://generated-image-url.jpg',
     },
     upVotesBy: [],
     downVotesBy: [],
     comments: [
       {
         id: 'comment-1',
         content: 'Ini adalah komentar pertama',
         createdAt: '2021-06-21T07:00:00.000Z',
         owner: {
           id: 'users-1',
           name: 'John Doe',
           avatar: 'https://generated-image-url.jpg',
         },
         upVotesBy: [],
         downVotesBy: [],
       },
     ],

   };

   const action = {
     type: 'TOGGLE_DISLIKE_COMMENT_THREAD',
     payload: {
       commentId: 'comment-1',
       userId: 'users-2',
     },
   };

   const nextState = threadDetailReducer(initialState, action);

   expect(nextState.comments[0].downVotesBy).toEqual([action.payload.userId]);

   expect(nextState).toEqual({
     ...initialState,
     comments: [
       {
         ...initialState.comments[0],
         downVotesBy: [action.payload.userId],
       },
     ],
   });

   const nextState2 = threadDetailReducer(nextState, action);
   expect(nextState.downVotesBy).toEqual([]);

   expect(nextState2).toEqual(initialState);
 });

 it('should return the threadDetail with the new comment when given by ADD_COMMENT', () => {
   const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
      ],
 
    };
 
    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          content: 'mamah aku komen',
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments).toEqual([action.payload.comment, ...initialState.comments]);
 })
});
