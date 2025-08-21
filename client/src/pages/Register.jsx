import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 20px;
`;

const RegisterCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #555;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.875rem;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #495057;
  }
`;

const Button = styled.button`
  background: #212529;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #343a40;
  }
`;

const LoginText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
`;

const LoginLink = styled(Link)`
  color: #212529;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
        const res = await fetch('http://localhost:5050/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
            navigate('/login'); // Redirect to login on successful registration
        } else {
            console.error('Login failed:', data);
        }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Register</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </InputGroup>
          <Button type="submit">Register</Button>
        </Form>
        <LoginText>
          Already have an account? <LoginLink to="/login">Log in</LoginLink>
        </LoginText>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
