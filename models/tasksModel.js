// models/tasksModel.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, 
      minlength: 1,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "general",
      trim: true,
      enum: ["general", "work", "personal", "urgent"], 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema); 
