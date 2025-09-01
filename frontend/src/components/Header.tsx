import React from 'react';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg">
      <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6">
  <Link to="/" className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg hover:text-white transition-colors duration-200">EventReg</Link>
        <div className="flex flex-wrap gap-2 md:gap-6 mt-2 md:mt-0">
          <Link to="/" className="px-3 py-2 rounded-md text-white hover:bg-white/20 hover:text-white transition-colors duration-200 font-medium">Home</Link>
          <Link to="/login" className="px-3 py-2 rounded-md text-white hover:bg-white/20 hover:text-white transition-colors duration-200 font-medium">Login</Link>
          <Link to="/registration" className="px-3 py-2 rounded-md text-white hover:bg-white/20 hover:text-white transition-colors duration-200 font-medium">Register</Link>
          <Link to="/profile" className="px-3 py-2 rounded-md text-white hover:bg-white/20 hover:text-white transition-colors duration-200 font-medium">Profile</Link>
          <Link to="/admin" className="px-3 py-2 rounded-md text-white hover:bg-white/20 hover:text-white transition-colors duration-200 font-medium">Admin</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
