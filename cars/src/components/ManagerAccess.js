import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  border-radius: 10px;
  z-index: 1000;
  width: 90%;
  max-width: 400px;
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
`;

const ManagerAccess = ({ onClose }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const managerPassword = process.env.REACT_APP_MANAGER_PASSWORD || 'manager123';
    
    if (password === managerPassword) {
      const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('isManager', 'true');
      localStorage.setItem('managerExpires', expiresAt.toString());
      toast.success('Manager access granted');
      window.location.reload();
    } else {
      toast.error('Invalid password');
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Enter manager password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <Button type="submit">Access Manager Mode</Button>
      </form>
    </Modal>
  );
};

export default ManagerAccess; 