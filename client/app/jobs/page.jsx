"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navabar";
const dummyJobs = [
  {
    id: 1,
    title: "Développeur Front-end React",
    company: "TechCorp",
    location: "Paris, France",
    description: "Nous cherchons un développeur React expérimenté pour rejoindre notre équipe frontend.",
    postedDate: "2 jours",
  },
  {
    id: 2,
    title: "Data Scientist Junior",
    company: "DataLab",
    location: "Lyon, France",
    description: "Stage ou premier emploi pour un passionné de data et machine learning.",
    postedDate: "5 jours",
  },
];

export default function JobsPage() {
  return (
    <>
        <Navbar />
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Offres d’emploi</h1>
      <ul className="space-y-6">
        {dummyJobs.map(({ id, title, company, location, description, postedDate }) => (
            <li
            key={id}
            className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
            >
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-600 italic">{company} — {location}</p>
            <p className="mt-2 text-gray-700">{description}</p>
            <p className="mt-3 text-sm text-gray-400">Posté il y a {postedDate}</p>
            <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
              Postuler
            </button>
          </li>
        ))}
      </ul>
    </div>
    <Sidebar/>
        </>
  );
}
