import React from 'react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dr. Your Name</h1>
        <nav className="hidden md:flex space-x-4">
          <a href="#about" className="hover:text-blue-200">About</a>
          <a href="#research" className="hover:text-blue-200">Research</a>
          <a href="#publications" className="hover:text-blue-200">Publications</a>
          <a href="#education" className="hover:text-blue-200">Education</a>
          <a href="#contact" className="hover:text-blue-200">Contact</a>
        </nav>
        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;