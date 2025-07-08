import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/api/notifications/me')
      .then(res => {
        if (res.data.success) setNotifications(res.data.notifications);
        else setError(res.data.error?.message || 'Failed to fetch notifications');
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
