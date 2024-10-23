import React from 'react';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <main className="p-4">{children}</main>
      <footer className="bg-gray-800 text-white text-center p-4">
      <h2 className="text-lg">MyStore</h2>
      <p className="text-sm">© {new Date().getFullYear()} MyStore. All rights reserved.</p>
    </footer>
    </div>
  );
};

export default Layout;
