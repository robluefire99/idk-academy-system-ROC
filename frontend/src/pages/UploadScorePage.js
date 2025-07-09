import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addScore } from '../store/slices/scoreSlice';
import { getStudents } from '../api/api';

export default () => {
  const [data, setData] = useState({ studentName: '', subject: '', score: 0, feedback: '' });
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getStudents().then(res => {
      setStudents(res.data.students || res.data);
    });
  }, []);

  return (
    <form onSubmit={e => { e.preventDefault(); dispatch(addScore(data)); }}>
      <select onChange={e => setData({ ...data, studentName: e.target.value })} required>
        <option value="">Select Student</option>
        {students.map(s => (
          <option key={s._id} value={s.name}>{s.name} ({s.email})</option>
        ))}
      </select>
      <input placeholder="Subject" onChange={e => setData({ ...data, subject: e.target.value })} />
      <input type="number" placeholder="Score" onChange={e => setData({ ...data, score: Number(e.target.value) })} />
      <textarea placeholder="Feedback" onChange={e => setData({ ...data, feedback: e.target.value })} />
      <button type="submit">Upload</button>
    </form>
  );
};