import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.js";
import stickersData from "./stickers.json";
import "./navbar.css";
//import logo from "../../public/images/sticker-logo.png";

const Navbar = () => {
  const { currentUser, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [stickerTypes, setStickerTypes] = useState([]);
  const hideDropdownTimeout = useRef(null);
  const hideProfileDropdownTimeout = useRef(null);

  useEffect(() => {
    const types = [
      ...new Set(stickersData.map((sticker) => sticker.type)),
    ].sort();
    setStickerTypes(types);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
  };

  const handleStickersMouseEnter = () => {
    clearTimeout(hideDropdownTimeout.current);
    setIsDropdownOpen(true);
  };

  const handleStickersMouseLeave = () => {
    hideDropdownTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleProfileMouseEnter = () => {
    clearTimeout(hideProfileDropdownTimeout.current);
    setIsProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    hideProfileDropdownTimeout.current = setTimeout(() => {
      setIsProfileDropdownOpen(false);
    }, 200);
  };

  return (
    <nav className="cuerpo-nav">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="logo">
          <img src="public\images\sticker-logo.png" alt="StickerAtick Logo" className="h-8" />
          </Link>
          <div
            className="relative"
            onMouseEnter={handleStickersMouseEnter}
            onMouseLeave={handleStickersMouseLeave}
          >
            <button className="text-gray-300 hover:text-white focus:outline-none bg-transparent">
              Stickers
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                {stickerTypes.map((type) => (
                  <Link
                    key={type}
                    to={`/stickers/${encodeURIComponent(type)}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {type}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          {currentUser ? (
            <div
              className="relative"
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              <button className="text-gray-300 hover:text-white focus:outline-none bg-transparent">
                {currentUser.username}
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/purchases"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Purchases
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 bg-transparent"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          )}
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
          {currentUser ? (
            <div
              className="relative"
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              <button className="block px-2 py-1 text-gray-300 hover:text-white focus:outline-none bg-transparent flex items-center">
                {currentUser.username}
                <svg
                  className="w-4 h-4 ml-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/purchases"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    Purchases
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 bg-transparent"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="block px-2 py-1 text-gray-300 hover:text-white"
            >
              Login
            </Link>
          )}
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
