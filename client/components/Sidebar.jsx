import { useState } from "react";
import { FaHome, FaUserFriends, FaBriefcase, FaBell, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

const menu = [
  { label: "Accueil", icon: <FaHome />, href: "/feed" },
  { label: "Réseau", icon: <FaUserFriends />, href: "/network" },
  { label: "Offres", icon: <FaBriefcase />, href: "/jobs" },
  { label: "Notifications", icon: <FaBell />, href: "/notifications" },
  { label: "Messages", icon: <FaEnvelope />, href: "/messages" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton hamburger mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-md"
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le menu"
      >
        <FaBars />
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg border-r p-4
          w-64
          transform transition-transform duration-300 ease-in-out
          z-50
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Bouton fermer mobile */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold text-blue-600">ProLink</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le menu"
            className="text-gray-700 hover:text-blue-600"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Titre pour desktop */}
        <h2 className="hidden md:block text-xl font-bold mb-6 text-blue-600">ProLink</h2>

        <ul className="space-y-4">
          {menu.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition font-medium"
                onClick={() => setIsOpen(false)} // Fermer menu mobile quand on clique
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
