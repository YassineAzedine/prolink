"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navabar";
import React, { useState } from "react";

const dummySuggestions = [
  {
    id: 1,
    name: "Jean Martin",
    role: "Product Manager",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 2,
    name: "Sara Lopez",
    role: "UX Designer",
    avatar: "https://i.pravatar.cc/40?img=6",
  },
  {
    id: 3,
    name: "Ahmed Benali",
    role: "Développeur Backend",
    avatar: "https://i.pravatar.cc/40?img=7",
  },
];

export default function NetworkPage() {
  const [suggestions, setSuggestions] = useState(dummySuggestions);
  const [connections, setConnections] = useState([]);
  const [sentInvitations, setSentInvitations] = useState([]);

  // Envoyer invitation
  const handleConnect = (id) => {
    if (!sentInvitations.includes(id)) {
      setSentInvitations([...sentInvitations, id]);
    }
  };

  // Accepter invitation (simulation, ici auto-accept)
  const handleAccept = (id) => {
    if (!connections.includes(id)) {
      setConnections([...connections, id]);
      setSentInvitations(sentInvitations.filter((inv) => inv !== id));
    }
  };

  return (
    <>
        <Navbar/>
      <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Réseau</h1>

      {/* Suggestions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Suggestions de connexion</h2>
        <ul className="space-y-4">
          {suggestions.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between border rounded p-4"
            >
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
              <button
                disabled={
                  sentInvitations.includes(user.id) || connections.includes(user.id)
                }
                onClick={() => handleConnect(user.id)}
                className={`px-4 py-2 rounded font-semibold ${
                  sentInvitations.includes(user.id) || connections.includes(user.id)
                    ? "bg-gray-300 cursor-not-allowed text-gray-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {connections.includes(user.id)
                  ? "Connecté"
                  : sentInvitations.includes(user.id)
                  ? "Invitation envoyée"
                  : "Connecter"}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Connexions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Vos connexions</h2>
        {connections.length === 0 ? (
          <p className="text-gray-600">Vous n’avez pas encore de connexions.</p>
        ) : (
          <ul className="space-y-4">
            {connections.map((id) => {
              const user = suggestions.find((u) => u.id === id);
              if (!user) return null;
              return (
                <li
                  key={user.id}
                  className="flex items-center border rounded p-4 space-x-4"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
                      <Sidebar />
      </section>

      
    </div>
    </>
  );
}
