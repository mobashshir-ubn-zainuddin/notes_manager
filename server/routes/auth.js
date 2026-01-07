const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// Register Route
router.post("/register", async (req, res) => {
  const { email, password, confirmPassword } = req.body

  // Validation
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please provide all required fields." })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." })
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." })
    }

    // Create new user
    const user = new User({ email, password })
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: { id: user._id, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message })
  }
})

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password." })
  }

  try {
    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." })
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      message: "Login successful.",
      token,
      user: { id: user._id, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message })
  }
})

module.exports = router
