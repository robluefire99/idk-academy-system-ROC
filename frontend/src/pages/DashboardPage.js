import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.css';

export default () => (
  <div className={styles.dashboardContainer}>
    <h2 className={styles.heading}>Welcome to IDKAcademy Score Dashboard</h2>
    <div className={styles.cardGrid}>
      <Link to="/lecturer/students" className={styles.card}>My Students</Link>
      <Link to="/lecturer/notifications" className={styles.card}>Send Notification</Link>
      <Link to="/student/scores" className={styles.card}>My Scores</Link>
      <Link to="/student/notifications" className={styles.card}>My Notifications</Link>
      <Link to="/score-visualization" className={styles.card}>Score Performance Graph</Link>
      <Link to="/dummy-students" className={styles.card}>View Dummy Student Data</Link>
    </div>
  </div>
);
