// routes/usersRoute.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksController");

// localhost:3000/tasks
router.post("/", taskController.createTask);
// localhost:3000/tasks?status=completed
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.patch("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
