import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const DetailLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-global-bg">
      {/* Page Content */}
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default DetailLayout;