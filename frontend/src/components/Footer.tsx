import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">

      <div className='flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start mb-4 mx-auto max-w-4xl text-center md:text-left space-y-4 md:space-y-0'>
        <div className="mb-2 md:mb-0">
          <h2 className='font-bold text-lg mb-2'> Navigation </h2>
          <ul className="space-y-1">
            <li><Link to="/"             className="hover:underline hover:text-gray-400">Home</Link></li>
            <li><Link to="/registration" className="hover:underline hover:text-gray-400">Register</Link></li>
            <li><Link to="/login"        className="hover:underline hover:text-gray-400">Login</Link></li>
            <li><Link to="/admin"        className="hover:underline hover:text-gray-400">Admin</Link></li>
          </ul>
        </div>

        <div className='mb-2 md:mb-0'>
          <h2 className='font-bold text-lg mb-2'> Address </h2>
          <p>123 Event St.</p>
          <p>City, State, ZIP</p>
          <p>Country</p>
        </div>

        <div className="mb-2 md:mb-0">
          <h2 className='font-bold text-lg mb-2'> Contact Us </h2>
          <p>Email: saikatislam709@gmail.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
      </div>
      <div className="container mx-auto text-center">
        <p>&copy; 2025 EventReg. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
