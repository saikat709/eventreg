import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        <div className="w-full h-full max-w-4xl mx-auto my-auto p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
