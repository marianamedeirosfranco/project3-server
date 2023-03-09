const router = require('express').Router();

//import the models
const Task = require('../models/Task.model');
const Comment = require('../models/Comment.model');

//Create

router.post('/comments', async (req, res, next) => {
  const { description } = req.body;

  try {
    const comments = await Comment.create({ description });

    await Task.findByIdAndUpdate(task, {comments})
      $push: {
        tasks: task._id,
      },
    });

    res.json(task);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;