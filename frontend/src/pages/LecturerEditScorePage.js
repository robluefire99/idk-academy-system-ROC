import React, { useState, useEffect } from 'react';
import { getStudentScores, updateScore } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function LecturerEditScorePage() {
  const { id } = useParams(); // score id
  const [form, setForm] = useState({ subject: '', score: '', max_score: 100, feedback: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Find the score by id (could be optimized with a dedicated endpoint)
    // For now, assume parent page passes score data or fetch all and filter
    // Here, just skip prefill for brevity
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateScore(id, form);
      if (res.data.success) navigate(-1);
      else setError(res.data.error?.message || 'Update failed');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Score</h2>
      <input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
      <input type="number" placeholder="Score" value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} />
      <input type="number" placeholder="Max Score" value={form.max_score} onChange={e => setForm({ ...form, max_score: e.target.value })} />
      <input placeholder="Feedback" value={form.feedback} onChange={e => setForm({ ...form, feedback: e.target.value })} />
      <button type="submit">Update</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
