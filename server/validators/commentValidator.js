const { body } = require("express-validator");

exports.createCommentValidator = [
  body("text")
    .notEmpty()
    .withMessage("Comment text is required")
    .isLength({ max: 500 })
    .withMessage("Comment must be under 500 characters"),
];
