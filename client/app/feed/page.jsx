"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navabar";
const dummyPosts = [
  {
    id: 1,
    author: "Alice Dupont",
    role: "Développeuse Front-end",
    avatar: "https://i.pravatar.cc/50?img=1",
    content: "Aujourd'hui, j'ai appris comment utiliser Next.js avec Tailwind CSS. Super pratique !",
    date: "2h",
  },
  {
    id: 2,
    author: "Mohamed El Amrani",
    role: "Data Scientist",
    avatar: "https://i.pravatar.cc/50?img=2",
    content: "Partage d'article sur l'IA dans l'industrie.",
    date: "5h",
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState({}); // {postId: true/false}
  const [comments, setComments] = useState({
    1: ["Super post!", "Très intéressant!"],
    2: ["Merci du partage!"],
  });
  const [showComments, setShowComments] = useState({}); // postId: true/false
  const [commentInput, setCommentInput] = useState({}); // postId: texte

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      author: "Vous",
      role: "Utilisateur ProLink",
      avatar: "https://i.pravatar.cc/50?img=3",
      content: newPost,
      date: "À l'instant",
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const addComment = (postId) => {
    if (!commentInput[postId]?.trim()) return;
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentInput[postId]],
    }));
    setCommentInput((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <>
    <Navbar/>
    <main className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      {/* Main feed */}
      <section className="flex-1 bg-white rounded-lg shadow-md p-6">
        {/* New Post Form */}
        <form onSubmit={handlePostSubmit} className="mb-6">
          <textarea
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Exprimez-vous ici..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            />
          <button
            type="submit"
            className="mt-2 bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800 transition"
            >
            Publier
          </button>
        </form>

        {/* Posts List */}
        <div className="space-y-8">
          {posts.map(({ id, author, role, avatar, content, date }) => (
              <article
              key={id}
              className="border rounded-md p-4 hover:shadow-lg transition cursor-pointer"
              >
              <header className="flex items-center mb-3">
                <img
                  src={avatar}
                  alt={author}
                  className="w-12 h-12 rounded-full mr-4"
                  />
                <div>
                  <h3 className="font-semibold">{author}</h3>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
                <span className="ml-auto text-xs text-gray-400">{date}</span>
              </header>
              <p className="text-gray-700 mb-3">{content}</p>

              <div className="flex space-x-4 text-sm font-semibold text-gray-600">
                <button
                  onClick={() => toggleLike(id)}
                  className={`hover:text-blue-600 transition ${
                    likedPosts[id] ? "text-blue-600" : ""
                    }`}
                    >
                  {likedPosts[id] ? "Aimé ❤️" : "Aimer ♡"}
                </button>
                <button
                  onClick={() => toggleComments(id)}
                  className="hover:text-blue-600 transition"
                  >
                  {showComments[id] ? "Cacher commentaires" : "Voir commentaires"}
                </button>
              </div>

              {showComments[id] && (
                  <div className="mt-4">
                  {(comments[id] || []).map((c, i) => (
                      <p
                      key={i}
                      className="text-sm border-b py-1 last:border-b-0"
                      >
                      {c}
                    </p>
                  ))}

                  <div className="flex mt-2 space-x-2">
                    <input
                      type="text"
                      value={commentInput[id] || ""}
                      onChange={(e) =>
                        setCommentInput((prev) => ({ ...prev, [id]: e.target.value }))
                    }
                    className="border rounded px-2 py-1 flex-grow"
                    placeholder="Ajouter un commentaire"
                    />
                    <button
                      onClick={() => addComment(id)}
                      className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800 transition"
                      >
                      Publier
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <img
            src="https://i.pravatar.cc/60?img=4"
            alt="Profil"
            className="rounded-full w-14 h-14 mr-4"
            />
          <div>
            <h2 className="font-bold text-lg">Utilisateur ProLink</h2>
            <p className="text-sm text-gray-500">Développeur web</p>
          </div>
        </div>
        <hr className="mb-4" />
        <h3 className="font-semibold mb-2">Suggestions de connexion</h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://i.pravatar.cc/40?img=5"
                alt="Jean Martin"
                className="rounded-full w-10 h-10 mr-3"
                />
              <div>
                <p className="font-medium">Jean Martin</p>
                <p className="text-xs text-gray-500">Product Manager</p>
              </div>
            </div>
            <button className="text-blue-700 font-semibold hover:underline">
              Connecter
            </button>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://i.pravatar.cc/40?img=6"
                alt="Sara Lopez"
                className="rounded-full w-10 h-10 mr-3"
                />
              <div>
                <p className="font-medium">Sara Lopez</p>
                <p className="text-xs text-gray-500">UX Designer</p>
              </div>
            </div>
            <button className="text-blue-700 font-semibold hover:underline">
              Connecter
            </button>
          </li>
        </ul>
      </aside>
    </main>
                </>
  );
}
