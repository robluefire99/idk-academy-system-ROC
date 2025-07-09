import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', gender: 'M', role: 'student', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);

  const fetchStudents = () => {
    API.get('/users?role=student').then(res => {
      if (res.data.success) setStudents(res.data.users);
      else setError(res.data.error);
    });
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleEdit = (student) => {
    setEditing(student._id);
    setForm({ name: student.name, email: student.email, gender: student.gender || 'M', role: 'student', password: '', confirmPassword: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    await API.delete(`/users/${id}`);
    fetchStudents();
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
      setForm({ name: '', email: '', gender: 'M', role: 'student', password: '', confirmPassword: '' });
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Student List</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input required placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required={!editing} />
        <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required={!editing} />
        <button type="submit">{editing ? 'Update' : 'Add'} Student</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', email: '', gender: 'M', role: 'student', password: '', confirmPassword: '' }); }}>Cancel</button>}
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f7fafc' }}>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Name</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Email</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Gender</th>
            <th style={{ padding: 8, border: '1px solid #e2e8f0' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{s.name}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{s.email}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>{s.gender === 'M' ? 'Male' : 'Female'}</td>
              <td style={{ padding: 8, border: '1px solid #e2e8f0' }}>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s._id)} style={{ marginLeft: 8 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
