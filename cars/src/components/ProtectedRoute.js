import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const checkManagerStatus = () => {
    const isManager = localStorage.getItem('isManager') === 'true';
    const expiresAt = localStorage.getItem('managerExpires');
    
    if (isManager && expiresAt) {
      if (new Date().getTime() > parseInt(expiresAt)) {
        localStorage.removeItem('isManager');
        localStorage.removeItem('managerExpires');
        return false;
      }
      return true;
    }
    return false;
  };

  if (!checkManagerStatus()) {
    toast.error('Manager access required');
    return <Navigate to="/" />;
  }
  
  return children;
};

export default ProtectedRoute; 