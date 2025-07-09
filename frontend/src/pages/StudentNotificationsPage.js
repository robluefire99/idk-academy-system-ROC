import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/notifications')
      .then(res => {
        setNotifications(res.data); // backend returns array
      })
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>My Notifications</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {notifications.map(n => (
          <li key={n._id}>
            {n.message} <span style={{ color: n.read ? 'gray' : 'blue' }}>{n.read ? '(Read)' : '(New)'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
