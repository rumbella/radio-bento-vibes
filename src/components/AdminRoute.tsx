import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './ui/Spinner';

const AdminRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (user && user.email === 'lapo.ristori@gmail.com') {
    return <Outlet />;
  }

  return <Navigate to="/pre-launch" />;
};

export default AdminRoute;
