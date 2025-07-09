import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './DashboardPage.module.css';

export default () => {
  const role = useSelector(state => state.auth.role);
  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.heading}>Welcome to IDKAcademy Score Dashboard</h2>
      <div className={styles.cardGrid}>
        {role === 'lecturer' && <Link to="/lecturer/students" className={styles.card}>My Students</Link>}
        {role === 'lecturer' && <Link to="/lecturer/notifications" className={styles.card}>Send Notification</Link>}
        {role === 'student' && <Link to="/student/scores" className={styles.card}>My Scores</Link>}
        {role === 'student' && <Link to="/student/notifications" className={styles.card}>My Notifications</Link>}
        <Link to="/score-visualization" className={styles.card}>Score Performance Graph</Link>
        <Link to="/dummy-students" className={styles.card}>View IDK Student Data</Link>
      </div>
    </div>
  );
};
