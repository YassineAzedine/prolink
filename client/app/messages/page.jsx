"use client";

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navabar";

const dummyConversations = [
  {
    id: 1,
    name: "Jean Martin",
    avatar: "https://i.pravatar.cc/50?img=5",
    messages: [
      { id: 1, sender: "them", text: "Salut ! Ça va ?", time: "09:15" },
      { id: 2, sender: "me", text: "Oui, merci. Et toi ?", time: "09:17" },
    ],
  },
  {
    id: 2,
    name: "Sara Lopez",
    avatar: "https://i.pravatar.cc/50?img=6",
    messages: [
      { id: 1, sender: "them", text: "Tu as vu le dernier article ?", time: "Hier" },
    ],
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState(dummyConversations);
  const [selectedConvId, setSelectedConvId] = useState(conversations[0]?.id || null);
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const selectedConv = conversations.find((c) => c.id === selectedConvId);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConvId) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            {
              id: conv.messages.length + 1,
              sender: "me",
              text: newMessage.trim(),
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConv?.messages]);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row h-[600px] border rounded-lg overflow-hidden shadow-md">
        {/* Bouton toggle sidebar visible seulement mobile */}
        <button
          className="md:hidden p-3 bg-blue-600 text-white font-semibold"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Fermer" : "Conversations"}
        </button>

        {/* Sidebar */}
        <aside
          className={`
            fixed top-[56px] left-0 bottom-0 z-30 w-72 bg-gray-100 border-r overflow-y-auto
            transform md:translate-x-0 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0
          `}
        >
          <h2 className="p-4 font-bold text-lg border-b">Conversations</h2>
          <ul>
            {conversations.map(({ id, name, avatar }) => (
              <li
                key={id}
                onClick={() => {
                  setSelectedConvId(id);
                  setSidebarOpen(false);
                }}
                className={`flex items-center p-3 cursor-pointer hover:bg-gray-200 ${
                  id === selectedConvId ? "bg-white font-semibold" : ""
                }`}
              >
                <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Zone messages */}
        <section className="flex-1 flex flex-col bg-white relative">
          <header className="p-4 border-b font-semibold sticky top-0 bg-white z-10">
            {selectedConv ? selectedConv.name : "Sélectionnez une conversation"}
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConv?.messages.map(({ id, sender, text, time }) => (
              <div
                key={id}
                className={`max-w-[60%] p-3 rounded-lg ${
                  sender === "me" ? "bg-blue-600 text-white self-end" : "bg-gray-200"
                }`}
              >
                <p>{text}</p>
                <time className="block text-xs mt-1 text-gray-600">{time}</time>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input message */}
          {selectedConv && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-4 border-t flex space-x-3"
            >
              <input
                type="text"
                placeholder="Écrire un message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
              >
                Envoyer
              </button>
            </form>
          )}
        </section>
      </div>

      {/* Sidebar component fixe (si tu souhaites garder, sinon tu peux retirer) */}
      <Sidebar />
    </>
  );
}
