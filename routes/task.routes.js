const router = require('express').Router();
const mongoose = require('mongoose');

const Task = require('../models/Task.model');
const Comment = require('../models/Comment.model');

const { isAuthenticated } = require('../middleware/jwt.middleware');

//Create

router.post('/tasks', isAuthenticated, async (req, res, next) => {
  const { title, description, status, importance, date } = req.body;

  try {
    const task = await Task.create({ title, description, status, importance, date });

    res.json(task);
  } catch (error) {
    res.json(error);
  }
});

//Read (all)

router.get('/tasks', isAuthenticated, async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('comments');
    res.json(tasks);
  } catch (error) {
    res.json(error);
  }
});

//Read (by id)

router.get('/tasks/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id).populate('comments');
    res.json(task);
  } catch (error) {
    res.json(error);
  }
});

//Update

router.put('/tasks/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status, importance, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json('The provided task id is not valid');
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, importance, date },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.json(error);
  }
});

//Delete

router.delete('/tasks/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json('The provided task id is not valid');
  }

  try {
    //remove the comments of the task
    const task = await Task.findById(id);
    await Comment.deleteMany({ _id: task.comments });

    //remove the task
    await Task.findByIdAndRemove(id);

    res.json({ message: `Task with the id ${id} deleted successfully` });
  } catch (error) {
    res.json(error);
  }
});

//SEARCH

module.exports = router;