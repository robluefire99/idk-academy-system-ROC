import React, { useEffect, useState } from 'react';
import { getStudents, getStudentScores } from '../api/api';
import { useSelector } from 'react-redux';

export default function DummyStudentListPage() {
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.auth.user);
  const role = useSelector(state => state.auth.role);

  useEffect(() => {
    async function fetchData() {
      try {
        if (role === 'lecturer') {
          const res = await getStudents();
          if (res.data.success) {
            setStudents(res.data.students);
            const allScores = {};
            for (const student of res.data.students) {
              const sres = await getStudentScores(student._id);
              if (sres.data.success) {
                allScores[student._id] = sres.data.scores.filter(score => score.subject === user.subject);
              } else {
                allScores[student._id] = [];
              }
            }
            setScores(allScores);
          } else {
            setError(res.data.error?.message || 'Failed to fetch students');
          }
        } else if (role === 'student') {
          setStudents([user]);
          // Simulate API: get all scores for this student
          const sres = await getStudentScores(user._id);
          if (sres.data.success) {
            // Group by subject and semester
            const bySubject = {};
            for (const score of sres.data.scores) {
              if (!bySubject[score.subject]) bySubject[score.subject] = [];
              bySubject[score.subject].push(score);
            }
            setScores(bySubject);
          } else {
            setScores({});
          }
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [user, role]);

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
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Scores</th>
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
                  {role === 'lecturer' && scores[student._id] && scores[student._id].length > 0 ? (
                    scores[student._id].map(score => (
                      <li key={score._id}>
                        <b>{score.subject}</b> ({score.semester || 'N/A'}): <span style={{ color: '#3182ce', fontWeight: 500 }}>{score.score}</span>
                      </li>
                    ))
                  ) : null}
                  {role === 'student' && Object.keys(scores).length > 0 ? (
                    Object.entries(scores).map(([subject, subjectScores]) => (
                      <li key={subject}>
                        <b>{subject}</b>:
                        {subjectScores.map(score => (
                          <span key={score._id} style={{ marginLeft: 8, marginRight: 16 }}>
                            {score.semester || 'N/A'}: <span style={{ color: '#3182ce', fontWeight: 500 }}>{score.score}</span>
                          </span>
                        ))}
                      </li>
                    ))
                  ) : null}
                  {((role === 'lecturer' && (!scores[student._id] || scores[student._id].length === 0)) || (role === 'student' && Object.keys(scores).length === 0)) && (
                    <li>No scores found</li>
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
