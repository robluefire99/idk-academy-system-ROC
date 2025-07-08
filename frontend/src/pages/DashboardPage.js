import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <h2>Welcome to Your Dashboard</h2>
    <ul>
      <li><Link to="/lecturer/students">My Students</Link></li>
      <li><Link to="/lecturer/notifications">Send Notification</Link></li>
      <li><Link to="/student/scores">My Scores</Link></li>
      <li><Link to="/student/notifications">My Notifications</Link></li>
    </ul>
  </div>
);
