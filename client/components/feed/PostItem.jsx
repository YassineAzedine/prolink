// Composant PostItem : représente un post avec son auteur, contenu, interactions et section commentaires
export default function PostItem({
  post,
  liked,
  reposted,
  commentsVisible,
  comments,
  commentInput,
  onLike,
  onRepost,
  onToggleComments,
  onCommentChange,
  onAddComment,
}) {
  return (
    <article className="border p-4 rounded-md bg-white">
      {/* En-tête du post : avatar, nom auteur, rôle, et date */}
      <header className="flex items-center mb-3">
        <img
          src={post.avatar}
          alt={post.author}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold">{post.author}</h3>
          <p className="text-sm text-gray-500">{post.role}</p>
        </div>
        <span className="ml-auto text-xs text-gray-400">{post.date}</span>
      </header>

      {/* Contenu du post */}
      <p className="mb-3">{post.content}</p>

      {/* Boutons d'interaction : Aimer, Commentaires, Partager */}
      <div className="flex space-x-4 text-sm text-gray-600 font-semibold mb-2">
        <button onClick={() => onLike(post.id)}>
          {liked ? "Aimé ❤️" : "Aimer ♡"}
        </button>
        <button onClick={() => onToggleComments(post.id)}>
          Commentaires{" "}
          {comments[post.id]?.length ? `(${comments[post.id].length})` : ""}
        </button>
        <button
          onClick={() => onRepost(post)}
          disabled={reposted}
          className={reposted ? "opacity-50 cursor-not-allowed" : ""}
        >
          {reposted ? "Partagé" : "Partager 🔁"}
        </button>
      </div>

      {/* Section commentaires affichée si activée */}
      {commentsVisible && (
        <div className="mt-3 space-y-2">
          {/* Liste des commentaires du post */}
        {comments[post.id]?.map((c, i) => (
  <div
    key={i}
    className="flex gap-3 items-start bg-white border border-gray-200 shadow-sm rounded-2xl p-4 mb-3 hover:shadow-md transition"
  >
    {/* Avatar auteur */}
    <div className="flex-shrink-0">
      <img
        src={c.avatar || "/default-avatar.png"}
        alt={c.author}
        className="w-10 h-10 rounded-full object-cover"
      />
    </div>

    {/* Contenu du commentaire */}
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <p className="font-semibold text-sm text-gray-800">{c.author}</p>
        <span className="text-xs text-gray-400">{c.date}</span>
      </div>
      <p className="text-sm text-gray-700 mt-1">{c.content}</p>
    </div>
  </div>
))}


          {/* Champ d’ajout de nouveau commentaire */}
          <div className="flex mt-2 gap-2">
            <input
              type="text"
              placeholder="Ajouter un commentaire..."
              value={commentInput[post.id] || ""}
              onChange={(e) => onCommentChange(post.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onAddComment(post.id);
              }}
              className="flex-1 px-3 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={() => onAddComment(post.id)}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
