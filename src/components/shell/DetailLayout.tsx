import React from 'react';
import { Outlet } from 'react-router-dom';
import PageTransition from '../ui/PageTransition';

interface DetailLayoutProps {
  children?: React.ReactNode;
}

const DetailLayout: React.FC<DetailLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-global-bg">
      {/* Page Content */}
      <main className="h-full w-full">
        <PageTransition direction="right">
          {children || <Outlet />}
        </PageTransition>
      </main>
    </div>
  );
};

export default DetailLayout;