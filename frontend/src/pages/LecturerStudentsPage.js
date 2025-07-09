import React, { useEffect, useState } from 'react';
import { getStudents } from '../api/api';

export default function LecturerStudentsPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStudents({ limit: 100 }) // Fetch up to 100 students
      .then(res => {
        if (res.data.success) setStudents(res.data.students);
        else setError(res.data.error?.message || 'Failed to fetch students');
      })
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>My Students</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {students.map(s => (
          <li key={s._id}>{s.name} ({s.email})</li>
        ))}
      </ul>
    </div>
  );
}
