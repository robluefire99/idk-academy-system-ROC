import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addScore } from '../store/slices/scoreSlice';

export default () => {
  const [data, setData] = useState({
    student: '', studentEmail: '', subject: '', score: 0, feedback: ''
  });
  const dispatch = useDispatch();

  return (
    <form onSubmit={e => { e.preventDefault(); dispatch(addScore(data)); }}>
      <input placeholder="Student ID"      onChange={e => setData({ ...data, student: e.target.value })} />
      <input placeholder="Student Email"   onChange={e => setData({ ...data, studentEmail: e.target.value })} />
      <input placeholder="Subject"         onChange={e => setData({ ...data, subject: e.target.value })} />
      <input type="number" placeholder="Score" onChange={e => setData({ ...data, score: Number(e.target.value) })} />
      <textarea placeholder="Feedback"     onChange={e => setData({ ...data, feedback: e.target.value })} />
      <button type="submit">Upload</button>
    </form>
  );
};
