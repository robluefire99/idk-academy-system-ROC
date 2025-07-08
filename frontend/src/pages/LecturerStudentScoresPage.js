import React, { useEffect, useState } from 'react';
import { getStudentScores, deleteScore } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function LecturerStudentScoresPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getStudentScores(id)
      .then(res => {
        if (res.data.success) {
          setStudent(res.data.student);
          setScores(res.data.scores);
        } else {
          setError(res.data.error?.message || 'Failed to fetch scores');
        }
      })
      .catch(err => setError(err.message));
  }, [id]);

  const handleDelete = async (scoreId) => {
    if (!window.confirm('Delete this score?')) return;
    try {
      const res = await deleteScore(scoreId);
      if (res.data.success) setScores(scores.filter(s => s._id !== scoreId));
      else setError(res.data.error?.message || 'Delete failed');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h2>Scores for {student.name}</h2>
      <button onClick={() => navigate(`/lecturer/student/${id}/add-score`)}>Add Score</button>
      <ul>
        {scores.map(score => (
          <li key={score._id}>
            <b>{score.subject}</b>: {score.score}/{score.max_score} ({score.feedback})
            <button onClick={() => navigate(`/lecturer/scores/${score._id}/edit`)}>Edit</button>
            <button onClick={() => handleDelete(score._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
