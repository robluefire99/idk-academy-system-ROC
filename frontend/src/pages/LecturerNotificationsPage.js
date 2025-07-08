import React, { useState } from 'react';
import { sendNotification } from '../api/api';

export default function LecturerNotificationsPage() {
  const [form, setForm] = useState({ student_id: '', message: '' });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendNotification(form);
      if (res.data.success) {
        setSuccess('Notification sent!');
        setError(null);
        setForm({ student_id: '', message: '' });
      } else {
        setError(res.data.error?.message || 'Send failed');
        setSuccess(null);
      }
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Send Notification</h2>
      <input placeholder="Student ID (blank for all)" value={form.student_id} onChange={e => setForm({ ...form, student_id: e.target.value })} />
      <input placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
      <button type="submit">Send</button>
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
