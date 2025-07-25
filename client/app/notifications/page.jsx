"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navabar";
import React, { useState } from "react";

const dummyNotifications = [
  {
    id: 1,
    type: "connection",
    message: "Jean Martin a accepté votre invitation.",
    date: "Il y a 1h",
  },
  {
    id: 2,
    type: "message",
    message: "Sara Lopez vous a envoyé un nouveau message.",
    date: "Il y a 3h",
  },
  {
    id: 3,
    type: "job",
    message: "Nouvelle offre d’emploi : Développeur React.",
    date: "Hier",
  },
];

// Icônes simples selon type (tu peux remplacer par des SVG ou icônes de librairies)
const icons = {
  connection: (
    <svg
      className="w-6 h-6 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a4 4 0 00-3-3.87M9 12a4 4 0 110-8 4 4 0 010 8zm0 0v8m6-4a4 4 0 110-8 4 4 0 010 8z"
      />
    </svg>
  ),
  message: (
    <svg
      className="w-6 h-6 text-green-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h10M7 12h8m-8 4h6"
      />
    </svg>
  ),
  job: (
    <svg
      className="w-6 h-6 text-purple-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3"
      />
    </svg>
  ),
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const markAllRead = () => setUnreadCount(0);

  return (
    <>
    
    <Navbar />
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <button
          onClick={markAllRead}
          className="text-sm text-blue-600 hover:underline"
          disabled={unreadCount === 0}
        >
          Tout marquer comme lu
        </button>
      </div>

      {unreadCount > 0 && (
        <p className="mb-4 text-gray-500 text-sm">
          {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue
          {unreadCount > 1 ? "s" : ""}
        </p>
      )}

      <ul className="divide-y divide-gray-200">
        {notifications.map(({ id, type, message, date }) => (
          <li key={id} className="flex items-start py-4 space-x-3">
            <div className="flex-shrink-0">{icons[type]}</div>
            <div>
              <p className="text-gray-700">{message}</p>
              <time className="text-xs text-gray-400">{date}</time>
            </div>
          </li>
        ))}
      </ul>
    </div>
      <Sidebar/>
</>
  );
}
