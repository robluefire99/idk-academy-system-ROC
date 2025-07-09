import React from 'react';
import { students, scores, subjects } from '../data/dummyStudents';

export default function DummyStudentListPage() {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>View IDK Student Data</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
        <thead>
          <tr style={{ background: '#f7fafc' }}>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>#</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Name</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Gender</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Scores (per subject, semester)</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={student.name}>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{idx + 1}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{student.name}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{student.gender === 'M' ? 'Male' : 'Female'}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {subjects.map(subject => (
                    <li key={subject.name}>
                      <b>{subject.name}</b>:
                      {["Semester 1", "Semester 2"].map(sem => {
                        const scoreObj = scores.find(s => s.student === student.name && s.subject === subject.name && s.semester === sem);
                        return (
                          <span key={sem} style={{ marginLeft: 8, marginRight: 16 }}>
                            {sem}: <span style={{ color: '#3182ce', fontWeight: 500 }}>{scoreObj ? scoreObj.score : '-'}</span>
                          </span>
                        );
                      })}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
