import './styles/App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CreateDiscussionPage from './pages/CreateDiscussionPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const {
    authUser = null,
    isPreload = false,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <Navbar authUser={authUser} />
        <main>
          <SideBar authUser={authUser} signOut={onSignOut} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/new" element={<CreateDiscussionPage />} />
            <Route path="/leadboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
