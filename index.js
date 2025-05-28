// index.js
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const taskRoutes = require("./routes/tasksRoute");
const usersRoute = require("./routes/usersRoute");
const app = express();

// Middleware
app.use(express.json());
app.use(session({
  secret: 'fallback-secret-key', 
  resave: false, 
  saveUninitialized: false, 
  rolling: true,
  cookie: {
    httpOnly: true, 
    maxAge: 30 * 60 * 1000, 
    sameSite: 'strict' 
  },
  name: 'sessionId' 
}));

// Connect to MongoDB
try{
  mongoose.connect("mongodb://localhost:27017/tasksDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  mongoose.connection.once("open", () => console.log("MongoDB connected"));
}
catch{
  console.error("Connect to Mongoose is error");
}

// Routes
app.use("/tasks", taskRoutes);
app.use("/users", usersRoute);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
