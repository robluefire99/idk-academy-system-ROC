import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function StudentScoreHistoryPage() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/api/scores/me')
      .then(res => {
        if (res.data.success) setScores(res.data.scores);
        else setError(res.data.error?.message || 'Failed to fetch scores');
      })
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>My Scores</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {scores.map(score => (
          <li key={score._id}>
            <b>{score.subject}</b>: {score.score}/{score.max_score} ({score.feedback})
          </li>
        ))}
      </ul>
    </div>
  );
}
