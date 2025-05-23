// index.js
const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasksRoute");
const usersRoute = require("./routes/usersRoute");
const app = express();

// Middleware
app.use(express.json()); // To parse JSON

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/tasksDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("MongoDB connected"));

// Routes
app.use("/tasks", taskRoutes);
app.use("/users", usersRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
