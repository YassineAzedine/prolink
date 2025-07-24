const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Add comment to post
exports.addComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const author = req.user.id;

    const comment = await Comment.create({ content, author, post: postId });

    // Add comment ref to post
    const post = await Post.findById(postId);
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get comments for a post
exports.getComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId })
      .populate("author", "fullName avatar")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
