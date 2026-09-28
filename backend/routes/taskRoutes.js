const express = require("express");
const Task = require("../models/Task");
console.log("taskRoutes.js loaded");
const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Task routes are working");
});
// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new task
router.post("/", async (req, res) => {
  try {
    const { name, duration } = req.body;

    const task = new Task({
      name,
      duration,
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a task
router.put("/:id", async (req, res) => {
  try {
    const { name, duration, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        name,
        duration,
        completed,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
