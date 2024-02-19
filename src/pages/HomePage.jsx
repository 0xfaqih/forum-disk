import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DiscussionList from '../components/DiscussionList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToggleDislikeThread, asyncToggleLikeThread, filterThreadsByCategoryActionCreator } from '../states/threads/action';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states); // @TODO: get authUser and isPreload state from store

  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to preload app
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onLike = (id) => {
    dispatch(asyncToggleLikeThread(id));
  };

  const onDislike = (id) => {
    dispatch(asyncToggleDislikeThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const categories = threads.map((thread) => thread.category);

  const handleSelectCategory = (category) => {
    dispatch(filterThreadsByCategoryActionCreator(category));
  };

  return (
    <section className="home-page">
      <DiscussionList
        threads={threadList}
        like={onLike}
        dislike={onDislike}
        onSelectCategory={handleSelectCategory}
        categories={categories}
      />
    </section>
  );
}

export default HomePage;
