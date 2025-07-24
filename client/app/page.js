import Navbar from "../components/Navabar.jsx";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto mt-10 px-4 md:flex md:items-center md:justify-between">
        {/* Text Content */}
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-900">
            Bienvenue sur <span className="text-blue-600">ProLink</span>
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Construisez votre réseau professionnel, explorez des opportunités et partagez vos idées avec le monde.
          </p>

          <div className="flex space-x-4">
            <a
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
            >
              Commencer
            </a>
            <a
              href="/login"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded shadow"
            >
              Se connecter
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-10 md:mt-0 md:w-1/2">
          <Image
            src="/images/networking2.svg"
            alt="Networking"
            width={500}
            height={400}
            className="rounded-lg shadow-lg text-blue-600"
       
          />
        </div>
      </main>

      {/* Getting Started Section */}
      <section className="max-w-4xl mx-auto mt-16 px-4 bg-white p-8 rounded-md shadow border">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Commencez ici</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Inscrivez-vous ou connectez-vous</li>
          <li>Créez votre profil professionnel</li>
          <li>Partagez des posts avec votre réseau</li>
          <li>Découvrez les profils des autres utilisateurs</li>
        </ul>
      </section>
    </>
  );
}
