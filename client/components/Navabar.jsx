"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaHome, FaUserFriends, FaBriefcase, FaBell, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    // Exemple récupération statut login
    // const logged = localStorage.getItem("isLoggedIn") === "true";
    // setIsLoggedIn(logged);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      {isLoggedIn ? (
        <Link href="/feed" className="text-blue-700 font-bold text-xl flex items-center whitespace-nowrap">
          {/* Cacher texte ProLink sur mobile */}
          <span className="hidden sm:inline">ProLink</span>
        </Link>
      ) : (
        <Link href="/" className="text-gray-700 font-bold text-xl flex items-center whitespace-nowrap">
          <span className="hidden sm:inline">ProLink</span>
        </Link>
      )}

      {/* Barre de recherche petite et responsive */}
      {isLoggedIn && (
        <div className="relative flex-1 max-w-xs mx-4 hidden sm:block">
          <input
            type="text"
            placeholder="Rechercher"
            className="w-full pl-10 pr-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      )}

      {/* Menu principal */}
      {isLoggedIn ? (
        <div className="flex items-center space-x-6 text-gray-600">
          <Link href="/feed" className="flex flex-col items-center hover:text-blue-700 text-sm">
            <FaHome size={20} />
            <span className="mt-1 hidden md:inline">Accueil</span>
          </Link>
          <Link href="/network" className="flex flex-col items-center hover:text-blue-700 text-sm">
            <FaUserFriends size={20} />
            <span className="mt-1 hidden md:inline">Réseau</span>
          </Link>
          <Link href="/jobs" className="flex flex-col items-center hover:text-blue-700 text-sm">
            <FaBriefcase size={20} />
            <span className="mt-1 hidden md:inline">Offres</span>
          </Link>
          <Link href="/notifications" className="relative flex flex-col items-center hover:text-blue-700 text-sm">
            <FaBell size={20} />
            <span className="mt-1 hidden md:inline">Notifications</span>
            {/* Exemple badge notification */}
            <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Link>
          <Link href="/messages" className="relative flex flex-col items-center hover:text-blue-700 text-sm">
            <FaEnvelope size={20} />
            <span className="mt-1 hidden md:inline">Messages</span>
            {/* Exemple badge messages */}
            <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              2
            </span>
          </Link>

          {/* Profil utilisateur */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center focus:outline-none ml-4"
              aria-haspopup="true"
              aria-expanded={showProfileMenu}
            >
              <img
                src="https://i.pravatar.cc/40?img=4"
                alt="Profil"
                className="rounded-full w-8 h-8 mr-2"
              />
              <span className="hidden md:inline text-gray-700 font-semibold">Utilisateur</span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Voir Profil
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-x-6">
          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-700 font-semibold"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            S’inscrire
          </Link>
        </div>
      )}
    </nav>
  );
}
