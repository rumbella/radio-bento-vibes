import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const DetailLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-black">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-20 text-white bg-black/50 rounded-full p-2 hover:bg-white/20 transition-colors"
        aria-label="Go back"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Page Content */}
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default DetailLayout;