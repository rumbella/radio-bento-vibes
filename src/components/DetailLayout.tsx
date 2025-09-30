import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';

interface DetailLayoutProps {
  children: React.ReactNode;
  to: string;
}

const DetailLayout: React.FC<DetailLayoutProps> = ({ children, to }) => {
  return (
    <div className="page-container">
      <div className="absolute top-4 left-4 z-10">
        <Link
          to={to}
          className="text-white flex items-center space-x-2 bg-white/10 backdrop-blur-md p-2 rounded-full"
          aria-label="Go back"
        >
          <ArrowBigLeft size={24} />
          <span>Back</span>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default DetailLayout;