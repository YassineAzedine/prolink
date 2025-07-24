"use client";

import React from "react";
import Navbar from "../../components/Navabar";
const user = {
  name: "Jean Dupont",
  avatar: "https://i.pravatar.cc/150?img=4",
  title: "Développeur Fullstack",
  location: "Paris, France",
  bio: "Passionné par le développement web, je crée des applications performantes et accessibles.",
  experience: [
    {
      id: 1,
      company: "TechCorp",
      role: "Ingénieur logiciel",
      period: "2021 - Présent",
      description: "Développement de solutions web avec React, Node.js et MongoDB.",
    },
    {
      id: 2,
      company: "WebSolutions",
      role: "Développeur Frontend",
      period: "2019 - 2021",
      description: "Création d’interfaces utilisateur modernes avec React et Tailwind CSS.",
    },
  ],
  skills: ["React", "Node.js", "Next.js", "Tailwind CSS", "MongoDB", "TypeScript"],
};

export default function ProfilePage() {
  return (
    <>
    <Navbar />
    <main className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover"
          />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.title}</p>
          <p className="text-gray-500">{user.location}</p>
          <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Modifier le profil
          </button>
        </div>
      </div>

      {/* Bio */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">À propos</h2>
        <p className="text-gray-700">{user.bio}</p>
      </section>

      {/* Experience */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Expérience</h2>
        <ul className="space-y-6">
          {user.experience.map(({ id, company, role, period, description }) => (
              <li key={id} className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-lg font-semibold">{role} - {company}</h3>
              <span className="text-sm text-gray-500">{period}</span>
              <p className="mt-1 text-gray-700">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Compétences</h2>
        <div className="flex flex-wrap gap-3">
          {user.skills.map((skill, i) => (
              <span
              key={i}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
          </>
  );
}
