// models/tasksModel.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // trim use for removing whitespace
      minlength: 1, // Minimum length of 1 character
    },
    completed: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "general",
      trim: true,
      enum: ["general", "work", "personal", "urgent"], // Restrict to specific categories
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to Users collection for future authentication
      required: false, // Optional for now
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Task", taskSchema); // "Task" is the name of the model
// we need it because we are using it in the controllers
// example: const Task = require("../models/tasksModel");
// Task is the name of the model
// and we are using it in the controllers to create, update, delete, and get tasks
