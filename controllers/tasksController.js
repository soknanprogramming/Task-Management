// controllers/tasksController.js
const Task = require("../models/tasksModel");

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getAllTasks = async (req, res) => {
  try {
    console.log(req.query); 
    if(req.query.status === "completed"){
      const tasks = await Task.find({ completed: true }).limit(10); // Limit to 10 tasks
      return res.status(200).json(tasks);
    }
    const tasks = await Task.find().limit(10); // Limit to 10 tasks
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated task
      runValidators: true, // Validate the update
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
