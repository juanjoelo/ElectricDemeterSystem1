import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css"; // Importa tu archivo CSS aquí


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="cuerpo-nav">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          StickerAtick!
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>
          <Link to="/cart" className="text-gray-300 hover:text-white">
            Cart
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link
            to="/"
            className="block px-2 py-1 text-gray-300 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="block px-2 py-1 text-gray-300 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block px-2 py-1 text-gray-300 hover:text-white"
          >
            Sign Up
          </Link>
          <Link
            to="/cart"
            className="block px-2 py-1 text-gray-300 hover:text-white"
          >
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
