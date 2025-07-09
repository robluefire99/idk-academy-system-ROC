import React, { useEffect, useState } from 'react';
import { getStudents, getStudentScores } from '../api/api';
import { useSelector } from 'react-redux';

export default function DummyStudentListPage() {
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getStudents();
        if (res.data.success) {
          setStudents(res.data.students);
          // Fetch scores for each student
          const allScores = {};
          for (const student of res.data.students) {
            const sres = await getStudentScores(student._id);
            if (sres.data.success) {
              // Only keep scores for lecturer's subject
              allScores[student._id] = sres.data.scores.filter(score => score.subject === user.subject);
            } else {
              allScores[student._id] = [];
            }
          }
          setScores(allScores);
        } else {
          setError(res.data.error?.message || 'Failed to fetch students');
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>View IDK Student Data</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
        <thead>
          <tr style={{ background: '#f7fafc' }}>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>#</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Name</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Email</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Scores (Your Subject Only)</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={student._id}>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{idx + 1}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{student.name}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{student.email}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {scores[student._id] && scores[student._id].length > 0 ? (
                    scores[student._id].map(score => (
                      <li key={score._id}>
                        <b>{score.subject}</b> ({score.semester || 'N/A'}): <span style={{ color: '#3182ce', fontWeight: 500 }}>{score.score}</span>
                      </li>
                    ))
                  ) : (
                    <li>No scores for your subject</li>
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
