const router = require('express').Router();
const mongoose = require('mongoose')

//import the models
const Task = require('../models/Task.model');
const Comment = require('../models/Comment.model');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//Create

router.post('/comments/:taskId', isAuthenticated, async (req, res, next) => {
  const { description } = req.body;
  const {taskId} = req.params
  // const _id = req.payload._id;

  try {
    const comments = await Comment.create({ description, taskId });

    await Task.findByIdAndUpdate(taskId, {
      $push: {
        comments: comments._id,
      },
    });

    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/comments/:commentId', async (req, res, next) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.json('The provided comment id is not valid');
  }

  try {
    //remove a specific comment from a task
    const findComment = await Comment.findByIdAndDelete(commentId);
    const task = await Task.findByIdAndUpdate(findComment.taskId, {
      $pull: {
        comments: commentId,
      },});
    

    res.json({ message: `Comment deleted successfully` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;