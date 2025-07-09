import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function LecturerListPage() {
  const [lecturers, setLecturers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'lecturer', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);

  const fetchLecturers = () => {
    API.get('/users?role=lecturer').then(res => {
      if (res.data.success) setLecturers(res.data.users);
      else setError(res.data.error);
    });
  };

  useEffect(() => { fetchLecturers(); }, []);

  const handleEdit = (lecturer) => {
    setEditing(lecturer._id);
    setForm({ name: lecturer.name, email: lecturer.email, role: 'lecturer', password: '', confirmPassword: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lecturer?')) return;
    await API.delete(`/users/${id}`);
    fetchLecturers();
  };

  const validateForm = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.email.trim()) return 'Email is required.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Invalid email format.';
    if (!editing && (!form.password || !form.confirmPassword)) return 'Password and confirmation are required.';
    if ((form.password || form.confirmPassword) && form.password !== form.confirmPassword) return 'Passwords do not match.';
    if ((form.password || form.confirmPassword) && form.password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const submitData = { ...form };
      if (!form.password) delete submitData.password;
      if (!form.confirmPassword) delete submitData.confirmPassword;
      if (editing) {
        await API.put(`/users/${editing}`, submitData);
      } else {
        await API.post('/users', submitData);
      }
      setEditing(null);
      setForm({ name: '', email: '', role: 'lecturer', password: '', confirmPassword: '' });
      fetchLecturers();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Lecturer List</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input required placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required={!editing} />
        <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required={!editing} />
        <button type="submit">{editing ? 'Update' : 'Add'} Lecturer</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', email: '', role: 'lecturer', password: '', confirmPassword: '' }); }}>Cancel</button>}
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f7fafc' }}>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Name</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Email</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map(l => (
            <tr key={l._id}>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{l.name}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{l.email}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>
                <button onClick={() => handleEdit(l)}>Edit</button>
                <button onClick={() => handleDelete(l._id)} style={{ marginLeft: 8 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
