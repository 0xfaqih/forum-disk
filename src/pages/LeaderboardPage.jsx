import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserItem from '../components/UserItem';
import { asyncLeaderboards } from '../states/shared/action';

function LeaderboardPage() {
  const { leaderboards = [] } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboard-page">
      <h1>Leadboard</h1>
      {
            leaderboards.map((leaderboard, index) => (
              <UserItem
                key={leaderboard.user.id}
                user={leaderboard.user}
                score={leaderboard.score}
                rank={index + 1}
              />
            ))
         }
    </div>
  );
}

export default LeaderboardPage;
