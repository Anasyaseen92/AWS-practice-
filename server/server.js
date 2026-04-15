const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// Serve static files from client folder
app.use(express.static(path.join(__dirname, "../client")));

// Routes
// Serve home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/clien.html"));
});

// API Routes
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to my backend API" });
});

// Handle form messages (optional API endpoint)
app.post("/api/message", (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  console.log("New message:", { name, email, message });
  
  res.json({ 
    success: true, 
    message: "Message received successfully! We'll get back to you soon." 
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT} 🚀`);
});
