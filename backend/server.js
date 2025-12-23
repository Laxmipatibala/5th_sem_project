const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// JWT secret key
const SECRET = "mysecretkey";

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/loginDemo")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// User model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  })
);

// SIGNUP ROUTE
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashed });

  res.json({ message: "Signup successful" });
});

// LOGIN ROUTE (JWT)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ message: "Wrong password" });

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    SECRET,
    { expiresIn: "7d" }
  );

  res.json({ message: "Login successful", token });
});

// JWT middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.user = decoded;
    next();
  });
}

// PROTECTED ROUTE
app.get("/dashboard-data", verifyToken, (req, res) => {
  res.json({
    message: "Access granted. Welcome to Dashboard!",
    user: req.user,
  });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
