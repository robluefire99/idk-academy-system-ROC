import React, { useState } from 'react';
import { addScore } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function LecturerAddScorePage() {
  const { id } = useParams(); // student id
  const [form, setForm] = useState({ subject: '', score: '', max_score: 100, feedback: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addScore({ ...form, student_id: id });
      if (res.data.success) navigate(-1);
      else setError(res.data.error?.message || 'Add failed');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Score</h2>
      <input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
      <input type="number" placeholder="Score" value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} />
      <input type="number" placeholder="Max Score" value={form.max_score} onChange={e => setForm({ ...form, max_score: e.target.value })} />
      <input placeholder="Feedback" value={form.feedback} onChange={e => setForm({ ...form, feedback: e.target.value })} />
      <button type="submit">Add</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
