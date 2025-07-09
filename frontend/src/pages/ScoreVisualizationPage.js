import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import API from '../api/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ScoreVisualizationPage() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.auth.user);
  const role = useSelector(state => state.auth.role);

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await API.get('/scores');
        setScores(res.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchScores();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const semesters = ['Semester 1', 'Semester 2'];

  let chartData;
  if (role === 'lecturer') {
    // Only lecturer's subject
    const dataBySemester = semesters.map(semester => {
      const filtered = scores.filter(s => s.semester === semester && s.subject === user.subject);
      const avg = filtered.length ? filtered.reduce((sum, s) => sum + s.score, 0) / filtered.length : 0;
      return Math.round(avg * 10) / 10;
    });
    chartData = {
      labels: semesters,
      datasets: [
        {
          label: user.subject + ' Average',
          data: dataBySemester,
          backgroundColor: ['#3182ce', '#63b3ed']
        }
      ]
    };
  } else {
    // Student: show all subjects
    const subjects = [...new Set(scores.map(s => s.subject))];
    chartData = {
      labels: subjects,
      datasets: semesters.map((semester, idx) => ({
        label: semester,
        data: subjects.map(subject => {
          const filtered = scores.filter(s => s.subject === subject && s.semester === semester);
          const avg = filtered.length ? filtered.reduce((sum, s) => sum + s.score, 0) / filtered.length : 0;
          return Math.round(avg * 10) / 10;
        }),
        backgroundColor: idx === 0 ? '#3182ce' : '#63b3ed'
      }))
    };
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>
        Average Student Score {role === 'lecturer' ? `for ${user.subject}` : 'by Subject & Semester'}
      </h2>
      <Bar data={chartData} options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: false }
        },
        scales: {
          y: { min: 0, max: 100 }
        }
      }} />
    </div>
  );
}
