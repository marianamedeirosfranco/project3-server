const router = require('express').Router();

//import the models
const Task = require('../models/Task.model');
const Comment = require('../models/Comment.model');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//Create

router.post('/comments', isAuthenticated, async (req, res, next) => {
  const { description } = req.body;
  // req.payload - Id, name, e-mail req.payload const _id = 

  try {
    const comments = await Comment.create({ description });

    await Task.findByIdAndUpdate(comments, {
      $push: {
        comments: comments._id,
      },
    });

    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;