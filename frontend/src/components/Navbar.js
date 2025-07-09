import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: '#f7fafc', marginBottom: 24 }}>
      <div>
        <Link to="/" style={{ fontWeight: 700, fontSize: 20, color: '#2b6cb0', textDecoration: 'none' }}>IDKAcademy</Link>
      </div>
      <div>
        {!token ? (
          <>
            <Link to="/login" style={{ marginRight: 16 }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: 16 }}>Hi, {user?.name || 'User'}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
