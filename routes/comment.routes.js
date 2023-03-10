const router = require('express').Router();

//import the models
const Task = require('../models/Task.model');
const Comment = require('../models/Comment.model');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//Create

router.post('/comments/:id', isAuthenticated, async (req, res, next) => {
  const { description } = req.body;
  const {id} = req.params
  // const _id = req.payload._id;

  try {
    const comments = await Comment.create({ description });

    await Task.findByIdAndUpdate(id, {
      $push: {
        comments: comments._id,
      },
    });

    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/comments/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json('The provided comment id is not valid');
  }

  try {
    //remove a specific comment from a task
    const task = await Task.findById(id);
    await Comment.findByIdAndDelete({ _id: task.comments });

    res.json({ message: `Comment with the id ${id} deleted successfully` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;