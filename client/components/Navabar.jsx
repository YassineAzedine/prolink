"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // Simule récupération du statut login depuis localStorage (ou autre)
  useEffect(() => {
        // const logged = localStorage.getItem("isLoggedIn") === "true";
        // setIsLoggedIn(logged);
  }, []);

  // Fermer menu quand clic dehors
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
    <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-2 flex items-center justify-between">
  {isLoggedIn ? (
  <Link href="/feed" className="text-blue-700 font-bold text-xl flex items-center">
    {/* Contenu quand connecté */}
    ProLink
  </Link>
) : (
  <Link href="/" className="text-gray-700 font-bold text-xl flex items-center">
    {/* Contenu quand pas connecté */}
    ProLink
  </Link>
)}

      {isLoggedIn ? (
        <>
          <div className="hidden md:flex flex-1 mx-6">
            <input
              type="text"
              placeholder="Rechercher"
              className="w-full border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/feed" className="text-gray-600 hover:text-blue-700 font-semibold">
              Accueil
            </Link>

            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center focus:outline-none"
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
        </>
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
