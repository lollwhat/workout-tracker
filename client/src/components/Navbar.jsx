import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logout from '../pages/Logout';

const Nav = styled.nav`
  background: #ffffff;
  color: #333;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s;
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:hover {
    color: #007bff;
    background-color: #f8f9fa;
  }
`;

const Navbar = () => (
  <Nav>
    <Link to="/dashboard" style={{ 
      fontWeight: 'bold', 
      fontSize: '1.4rem', 
      textDecoration: 'none',
      color: '#000000ff'
    }}>
      Workout Tracker
    </Link>
    <NavLinks>
      {sessionStorage.getItem('isLoggedIn') === 'false' && (
        <>
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Register</StyledLink>
        </>
      )}
      <StyledLink to="/create-workout">Create Workout</StyledLink>
      <Logout />
    </NavLinks>
  </Nav>
);

export default Navbar;
