const { body } = require("express-validator");

exports.createPostValidator = [
  body("content")
    .notEmpty()
    .withMessage("Post content is required")
    .isLength({ max: 1000 })
    .withMessage("Post content must be under 1000 characters"),
];
