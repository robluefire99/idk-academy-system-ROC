import React from 'react';
import { scores, subjects } from '../data/dummyStudents';
import { Bar } from 'react-chartjs-2';
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

// Group average scores by subject and semester
const getChartData = () => {
  const semesters = ['Semester 1', 'Semester 2'];
  const data = subjects.map(subject => {
    return semesters.map(semester => {
      const filtered = scores.filter(s => s.subject === subject.name && s.semester === semester);
      const avg = filtered.reduce((sum, s) => sum + s.score, 0) / filtered.length;
      return Math.round(avg * 10) / 10;
    });
  });
  return {
    labels: subjects.map(s => s.name),
    datasets: semesters.map((semester, idx) => ({
      label: semester,
      data: data.map(d => d[idx]),
      backgroundColor: idx === 0 ? '#3182ce' : '#63b3ed'
    }))
  };
};

export default function ScoreVisualizationPage() {
  const chartData = getChartData();
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Average Student Score by Subject & Semester</h2>
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
