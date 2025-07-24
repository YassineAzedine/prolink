const Post = require("../models/Post");
const User = require("../models/User");

// Create post
exports.createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const author = req.user.id; // assume user ID from auth middleware

    const post = await Post.create({ content, image, author });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get posts feed (optionally: posts by followed users)
exports.getPosts = async (req, res) => {
  try {
    // Here you could implement posts from followed users only
    const posts = await Post.find()
      .populate("author", "fullName avatar")
      .populate({
        path: "comments",
        populate: { path: "author", select: "fullName avatar" },
      })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Like / Unlike post
exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const index = post.likes.findIndex(id => id.toString() === userId);

    if (index === -1) {
      post.likes.push(userId);
      await post.save();
      return res.json({ message: "Post liked" });
    } else {
      post.likes.splice(index, 1);
      await post.save();
      return res.json({ message: "Post unliked" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
