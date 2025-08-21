import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
        const res = await fetch('http://localhost:5050/auth/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        });
        console.log('Logout response:', res);
        if (res.ok) {
            sessionStorage.removeItem('token');
            sessionStorage.setItem('isLoggedIn', 'false');
            navigate('/login');
            console.log('Logout successful');
        } else {
            console.error('Logout failed!');
        }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
};

export default Logout;
