import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute: React.FC = () => {
  const { user } = useAuth();

  if (user && user.email === 'lapo.ristori@gmail.com') {
    return <Outlet />;
  }

  return <Navigate to="/pre-launch" />;
};

export default AdminRoute;
