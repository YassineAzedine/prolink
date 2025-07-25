"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navabar";
import Sidebar from "../../components/Sidebar";
import NewPostForm from "../../components/feed/NewPostForm";
import PostItem from "../../components/feed/PostItem";

const dummyPosts = [
  {
    id: 1,
    author: "Alice Dupont",
    role: "Développeuse Front-end",
    avatar: "https://i.pravatar.cc/50?img=1",
    content: "Aujourd'hui, j'ai appris comment utiliser Next.js avec Tailwind CSS.",
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
  const [likedPosts, setLikedPosts] = useState({});
  const [reposted, setReposted] = useState({});
const [comments, setComments] = useState({
  1: [
    { author: "Yassine", content: "Super post!", date: "2025-07-25"  , avatar: "https://i.pravatar.cc/50?img=1",},
    { author: "Doha", content: "Très intéressant!", date: "2025-07-24" ,  avatar: "https://i.pravatar.cc/50?img=1",},
  ],
  2: [
    { author: "Ibrahim", content: "Merci du partage!", date: "2025-07-23" ,  avatar: "https://i.pravatar.cc/50?img=1",},
  ],
});
  const [showComments, setShowComments] = useState({});
  const [commentInput, setCommentInput] = useState({});

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

  const handleLike = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleToggleComments = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleRepost = (post) => {
    if (reposted[post.id]) return;
    const repost = {
      ...post,
      id: posts.length + 1,
      author: "Vous (partagé)",
      role: "Utilisateur ProLink",
      date: "À l'instant",
    };
    setPosts([repost, ...posts]);
    setReposted((prev) => ({ ...prev, [post.id]: true }));
  };

  const handleCommentChange = (postId, value) => {
    setCommentInput((prev) => ({ ...prev, [postId]: value }));
  };

const handleAddComment = (postId) => {
  const newComment = {
    author: "Yassine", // Remplace par l’utilisateur connecté si tu as l’auth
    content: commentInput[postId],
    date: new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
  };

  setComments((prev) => ({
    ...prev,
    [postId]: [...(prev[postId] || []), newComment],
  }));

  setCommentInput((prev) => ({ ...prev, [postId]: "" }));
};
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <section className="flex-1 bg-white rounded-lg shadow-md p-6">
          <NewPostForm
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            onSubmit={handlePostSubmit}
          />

          <div className="space-y-6">
            {posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                liked={likedPosts[post.id]}
                reposted={reposted[post.id]}
                commentsVisible={showComments[post.id]}
                comments={comments}
                commentInput={commentInput}
                onLike={handleLike}
                onRepost={handleRepost}
                onToggleComments={handleToggleComments}
                onCommentChange={handleCommentChange}
                onAddComment={handleAddComment}
              />
            ))}
          </div>
        </section>
        <Sidebar />

      </main>
    </>
  );
}
