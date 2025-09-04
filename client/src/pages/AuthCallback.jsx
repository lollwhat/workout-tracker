import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store the token
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      // If no token, redirect to login with error
      navigate('/login?error=auth_failed');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px'
    }}>
      Completing sign in...
    </div>
  );
};

export default AuthCallback;
