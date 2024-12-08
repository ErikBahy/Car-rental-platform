import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  &::before {
    content: "";
    position: fixed;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: url('/luxurycar1.jpg') no-repeat center center fixed;
    background-size: cover;
    filter: blur(15px);
    z-index: -1;
    transform: scale(1.1);
  }
`;

const AccessForm = styled.form`
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #ffd700;
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ffd700;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #ffd700;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #ffed4a;
  }
`;

const ManagerAccessPage = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const managerPassword = process.env.REACT_APP_MANAGER_PASSWORD || 'manager123';
    
    if (password === managerPassword) {
      const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('isManager', 'true');
      localStorage.setItem('managerExpires', expiresAt.toString());
      toast.success('Manager access granted');
      navigate('/');
    } else {
      toast.error('Invalid password');
    }
  };

  return (
    <PageContainer>
      <AccessForm onSubmit={handleSubmit}>
        <Title>Manager Access</Title>
        <Input
          type="password"
          placeholder="Enter manager password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <Button type="submit">Access Manager Mode</Button>
      </AccessForm>
    </PageContainer>
  );
};

export default ManagerAccessPage; 