export default function NewPostForm({ onSubmit, value, onChange }) {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <textarea
        className="w-full border rounded-md p-3 resize-none"
        rows={3}
        placeholder="Exprimez-vous ici..."
        value={value}
        onChange={onChange}
      />
      <button
        type="submit"
        className="mt-2 bg-blue-700 text-white px-5 py-2 rounded"
      >
        Publier
      </button>
    </form>
  );
}
