import React, { useState } from 'react';
import { FaUserCircle, FaShoppingCart, FaBell, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Title/Logo */}
        <div className="text-2xl font-bold text-gray-800">
          MyStore
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-gray-800" size={24} />
            ) : (
              <FaBars className="text-gray-800" size={24} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex space-x-8 absolute md:static bg-white w-full left-0 md:w-auto md:bg-transparent top-16 md:top-auto ${isOpen ? 'block' : 'hidden'}`}>
          <a href="/" className="text-gray-700 hover:text-blue-600 block md:inline-block py-2 md:py-0">Home</a>
          <a href="#shop" className="text-gray-700 hover:text-blue-600 block md:inline-block py-2 md:py-0">Shop</a>
          <a href="#about" className="text-gray-700 hover:text-blue-600 block md:inline-block py-2 md:py-0">About</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600 block md:inline-block py-2 md:py-0">Contact</a>
        </div>

        {/* Icons (Profile, Notification, Cart) */}
        <div className="flex space-x-6 items-center">
          <FaBell className="text-gray-600 hover:text-blue-600 cursor-pointer" size={24} />
         <a href='/cart'>
            
            <FaShoppingCart className="text-gray-600 hover:text-blue-600 cursor-pointer" size={24} />
        </a> 
            
          <FaUserCircle className="text-gray-600 hover:text-blue-600 cursor-pointer" size={24} />
        </div>
      </div>
    </nav>
  );
}
