import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function StudentScoreHistoryPage() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/scores')
      .then(res => {
        setScores(res.data); // backend returns array
      })
      .catch(err => setError(err.message));
  }, []);

  // Group scores by subject, year, and semester
  const grouped = {};
  scores.forEach(score => {
    // Extract year and semester from feedback or add them to Score model if needed
    // For now, assume all are 2024-2025 and semester is not in the model, so use order
    const subj = score.subject;
    if (!grouped[subj]) grouped[subj] = [];
    grouped[subj].push(score);
  });

  return (
    <div>
      <h2>My Scores</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {Object.keys(grouped).map(subject => (
        <div key={subject} style={{ marginBottom: 16 }}>
          <h3>{subject}</h3>
          <ul>
            {grouped[subject].map((score, idx) => (
              <li key={score._id}>
                Year: 2024-2025, Semester: {idx === 0 ? 'Semester 1' : 'Semester 2'} — {score.score}/{score.max_score} ({score.feedback})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
