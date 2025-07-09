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

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await API.get('/scores');
        // Only keep scores for lecturer's subject
        setScores(res.data.filter(score => score.subject === user.subject));
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchScores();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  // Group average scores by semester
  const semesters = ['Semester 1', 'Semester 2'];
  const dataBySemester = semesters.map(semester => {
    const filtered = scores.filter(s => s.semester === semester);
    const avg = filtered.length ? filtered.reduce((sum, s) => sum + s.score, 0) / filtered.length : 0;
    return Math.round(avg * 10) / 10;
  });

  const chartData = {
    labels: semesters,
    datasets: [
      {
        label: user.subject + ' Average',
        data: dataBySemester,
        backgroundColor: ['#3182ce', '#63b3ed']
      }
    ]
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Average Student Score for {user.subject} by Semester</h2>
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
