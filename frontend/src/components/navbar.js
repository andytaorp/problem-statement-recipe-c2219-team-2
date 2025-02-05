<<<<<<< HEAD
import { Link } from 'react-router-dom'
import { useLogout } from '../Hooks/useLogout'
import { useAuthContext } from '../Hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Recipe Buddy</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <button Link to='/checker'>Food Nutrition Checker</button>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
=======
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
>>>>>>> 2c135c927c9917948a0283622718c8183c5a9cdb
