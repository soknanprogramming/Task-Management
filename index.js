// index.js
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const MongoStore = require("connect-mongo");
const taskRoutes = require("./routes/tasksRoute");
const usersRoute = require("./routes/usersRoute");
const app = express();

mongoose.connect("mongodb://localhost:27017/tasksDB").then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connect to Mongoose is error", err));


const store = MongoStore.create({
  mongoUrl: "mongodb://localhost:27017/tasksDB",
  collectionName: "sessionId",
  ttl: 30 * 60
});

store.on('error', function(error) {
  console.error('MongoStore error:', error);
});

// Middleware
app.use(express.json());
app.use(session({
  secret: 'fallback-secret-key', 
  resave: false, 
  saveUninitialized: false, 
  rolling: true,
  store: store,
  cookie: {
    httpOnly: true, 
    maxAge: 30 * 60 * 1000, 
    sameSite: 'strict' 
  },
  name: 'sessionId' 
}));




// Routes
app.use("/tasks", taskRoutes);
app.use("/users", usersRoute);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
