import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#333', padding: '10px', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '10px' }}>Home</Link>
      {token && (
        <>
          <Link to="/add" style={{ color: '#fff', marginRight: '10px' }}>Add Recipe</Link>
          <Link to="/upload" style={{ color: '#fff', marginRight: '10px' }}>Upload Dish</Link>
          <button onClick={logout} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            Logout
          </button>
        </>
      )}
      {!token && (
        <>
          <Link to="/login" style={{ color: '#fff', marginRight: '10px' }}>Login</Link>
          <Link to="/signup" style={{ color: '#fff', marginRight: '10px' }}>Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
